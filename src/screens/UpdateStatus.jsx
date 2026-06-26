import { useState, useRef } from 'react'
import { STATUSES } from '../constants'
import StatusIcon from '../components/StatusIcon'
import { updateStatus, updateStartingSoon } from '../lib/supabase'

const TIMING_OPTIONS = [
  { label: 'Starting in 5 Min',  value: 'Starting in 5 Min' },
  { label: 'Starting in 10 Min', value: 'Starting in 10 Min' },
  { label: 'Starting in 30 Min', value: 'Starting in 30 Min' },
  { label: 'Starting in 60 Min', value: 'Starting in 60 Min' },
  { label: 'Not sure',           value: null },
]

// These statuses skip the timing question — go straight back
const SKIP_TIMING = new Set(['Climbing', 'Starting Soon', 'Finished'])

export default function UpdateStatus({ athlete, onBack, showToast }) {
  const [confirming, setConfirming] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savingTiming, setSavingTiming] = useState(false)
  const [statusSaved, setStatusSaved] = useState(false)
  const timingRef = useRef(null)

  async function handleSelect(status) {
    if (status === 'Finished') {
      setConfirming(true)
      return
    }
    if (!athlete) return
    setSaving(true)
    try {
      await updateStatus(athlete.id, status)
      if (SKIP_TIMING.has(status)) {
        showToast('Status updated')
        onBack()
      } else {
        showToast('Status updated')
        setStatusSaved(true)
        setTimeout(() => {
          timingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function saveFinished() {
    if (!athlete) return
    setSaving(true)
    try {
      await updateStatus(athlete.id, 'Finished')
      showToast('Status updated')
      onBack()
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleTimingSelect(value) {
    if (!athlete) return
    setSavingTiming(true)
    try {
      await updateStartingSoon(athlete.id, value)
      showToast(value ? `Set: ${value}` : 'Got it!')
      onBack()
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setSavingTiming(false)
    }
  }

  if (confirming) {
    return (
      <FinishedConfirm
        onCancel={() => setConfirming(false)}
        onConfirm={saveFinished}
        saving={saving}
      />
    )
  }

  return (
    <div className="min-h-dvh bg-cream">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <button onClick={onBack} className="text-burgundy text-[16px] font-semibold mb-3">
          ← Back
        </button>
        <h1 className="text-[24px] font-bold text-charcoal">What are you doing right now?</h1>
        <p className="text-[15px] text-warmGray mt-1">Tap once to update your team.</p>
      </div>

      <div className="px-4 pb-6 space-y-3">
        {STATUSES.map((status) => {
          const isCurrent = athlete?.current_status === status
          return (
            <button
              key={status}
              onClick={() => handleSelect(status)}
              disabled={saving || savingTiming}
              className={`w-full min-h-[56px] rounded-[14px] flex items-center px-5 gap-3 text-left transition-all active:scale-[0.98]
                ${isCurrent
                  ? 'bg-burgundy text-white border-2 border-burgundy'
                  : 'bg-cardBg border-2 border-border text-charcoal'
                }
                ${saving ? 'opacity-50' : ''}
              `}
            >
              <StatusIcon status={status} size={20} />
              <span className="text-[17px] font-semibold">{status}</span>
              {isCurrent && (
                <span className="ml-auto text-[13px] opacity-80">Current</span>
              )}
            </button>
          )
        })}

        {/* Timing section */}
        <div ref={timingRef} className="pt-3">
          <p className={`text-[13px] uppercase tracking-wide font-semibold mb-3 px-1 transition-colors ${
            statusSaved ? 'text-burgundy' : 'text-warmGray'
          }`}>
            {statusSaved ? '✓ Status saved — when\'s your next ascent?' : 'When\'s your next ascent?'}
          </p>
          <div className="space-y-3">
            {TIMING_OPTIONS.map((option) => {
              const isCurrent = option.value !== null && athlete?.starting_soon === option.value
              return (
                <button
                  key={option.label}
                  onClick={() => handleTimingSelect(option.value)}
                  disabled={saving || savingTiming}
                  className={`w-full min-h-[56px] rounded-[14px] flex items-center px-5 gap-3 text-left transition-all active:scale-[0.98]
                    ${isCurrent
                      ? 'bg-burgundy text-white border-2 border-burgundy'
                      : option.value === null
                        ? 'bg-cream border-2 border-border text-warmGray'
                        : 'bg-cardBg border-2 border-border text-charcoal'
                    }
                    ${savingTiming ? 'opacity-50' : ''}
                  `}
                >
                  <span className="text-[17px] font-semibold">{option.label}</span>
                  {isCurrent && (
                    <span className="ml-auto text-[13px] opacity-80">Current</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function FinishedConfirm({ onCancel, onConfirm, saving }) {
  return (
    <div className="min-h-dvh bg-cream flex flex-col items-center justify-center px-6">
      <div className="bg-cardBg border border-border rounded-[18px] p-6 w-full max-w-sm text-center">
        <p className="text-[20px] font-bold text-charcoal">Mark event finished?</p>
        <p className="text-[15px] text-warmGray mt-2">
          This will fill all 8 ascents as complete.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 min-h-[54px] bg-cream border-2 border-border rounded-[14px] text-[17px] font-semibold text-charcoal"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={saving}
            className="flex-1 min-h-[54px] bg-success text-white rounded-[14px] text-[17px] font-semibold disabled:opacity-50"
          >
            {saving ? '...' : 'Yes, Finished'}
          </button>
        </div>
      </div>
    </div>
  )
}
