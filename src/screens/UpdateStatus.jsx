import { useState } from 'react'
import { STATUSES } from '../constants'
import StatusIcon from '../components/StatusIcon'
import { updateStatus } from '../lib/supabase'

export default function UpdateStatus({ athlete, onBack, showToast }) {
  const [confirming, setConfirming] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleSelect(status) {
    if (status === 'Finished') {
      setConfirming(true)
      return
    }
    await save(status)
  }

  async function save(status) {
    if (!athlete) return
    setSaving(true)
    try {
      await updateStatus(athlete.id, status)
      showToast('Status updated')
      onBack()
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (confirming) {
    return (
      <FinishedConfirm
        onCancel={() => setConfirming(false)}
        onConfirm={() => save('Finished')}
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
              disabled={saving}
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
