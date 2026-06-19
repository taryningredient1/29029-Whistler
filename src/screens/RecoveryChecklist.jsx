import { useState, useEffect } from 'react'
import { RECOVERY_ITEMS } from '../constants'
import { updateRecovery, updateLmntTarget, updateLmntUsed } from '../lib/supabase'

export default function RecoveryChecklist({ athlete, onBack, showToast }) {
  const [checklist, setChecklist] = useState({
    water: false,
    electrolytes: false,
    fuel: false,
    bathroom: false,
    ready: false,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [lmntUsed, setLmntUsed] = useState(0)
  const [savingLmnt, setSavingLmnt] = useState(false)

  useEffect(() => {
    if (athlete) {
      setChecklist({
        water: athlete.recovery_water || false,
        electrolytes: athlete.recovery_electrolytes || false,
        fuel: athlete.recovery_fuel || false,
        bathroom: athlete.recovery_bathroom || false,
        ready: athlete.recovery_ready || false,
      })
      setLmntUsed(athlete.lmnt_used || 0)
    }
  }, [athlete])

  const allChecked = Object.values(checklist).every(Boolean)

  function toggle(key) {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
    setSaved(false)
  }

  async function handleSave() {
    if (!athlete) return
    setSaving(true)
    try {
      const isComplete = await updateRecovery(athlete.id, checklist)
      setSaved(true)
      if (isComplete) {
        showToast('Recovery complete ✓', 'success')
      } else {
        showToast('Recovery saved (incomplete)', 'warning')
      }
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleSetTarget(target) {
    if (!athlete) return
    try {
      await updateLmntTarget(athlete.id, target)
      showToast(`Target set: ${target} packets`)
    } catch (err) {
      showToast('Something went wrong', 'error')
    }
  }

  async function handleLmntChange(newUsed) {
    if (!athlete) return
    const target = athlete.lmnt_target || 18
    if (newUsed < 0 || newUsed > target) return
    setLmntUsed(newUsed)
    setSavingLmnt(true)
    try {
      await updateLmntUsed(athlete.id, newUsed)
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setSavingLmnt(false)
    }
  }

  const target = athlete?.lmnt_target
  const remaining = target ? target - lmntUsed : null

  return (
    <div className="min-h-dvh bg-cream">
      <div className="px-4 pt-12 pb-4">
        {onBack && (
          <button onClick={onBack} className="text-burgundy text-[16px] font-semibold mb-3">
            ← Back
          </button>
        )}
        <h1 className="text-[24px] font-bold text-charcoal">Recovery Check</h1>
        <p className="text-[15px] text-warmGray mt-1">Before your next ascent.</p>
      </div>

      <div className="px-4 pb-6 space-y-4">

        {/* LMNT Tracker */}
        <div className="bg-cardBg border border-border rounded-[18px] p-5">
          <p className="text-[16px] font-bold text-charcoal">LMNT Packets</p>

          {!target ? (
            /* Target not set yet */
            <div className="mt-3">
              <p className="text-[14px] text-warmGray mb-3">How many packets are you targeting for the full event?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSetTarget(12)}
                  className="flex-1 min-h-[54px] bg-cardBg border-2 border-border rounded-[14px] text-[17px] font-semibold text-charcoal active:opacity-70"
                >
                  12 packets
                </button>
                <button
                  onClick={() => handleSetTarget(18)}
                  className="flex-1 min-h-[54px] bg-burgundy text-white rounded-[14px] text-[17px] font-semibold active:opacity-80"
                >
                  18 packets
                </button>
              </div>
            </div>
          ) : (
            /* Target set — show tracker */
            <div className="mt-3">
              {/* Progress bar */}
              <div className="flex justify-between text-[13px] text-warmGray mb-1.5">
                <span>{lmntUsed} used</span>
                <span>{remaining} remaining of {target}</span>
              </div>
              <div className="w-full bg-inactive rounded-full h-2.5">
                <div
                  className="bg-burgundy h-2.5 rounded-full transition-all"
                  style={{ width: `${Math.min((lmntUsed / target) * 100, 100)}%` }}
                />
              </div>

              {/* Packet dots */}
              <div className="flex flex-wrap gap-2 mt-4">
                {Array.from({ length: target }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleLmntChange(i < lmntUsed ? i : i + 1)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[11px] font-bold transition-colors
                      ${i < lmntUsed
                        ? 'bg-burgundy border-burgundy text-white'
                        : 'border-inactive bg-cream text-inactive'
                      }
                    `}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => handleLmntChange(Math.max(0, lmntUsed - 1))}
                  disabled={lmntUsed === 0 || savingLmnt}
                  className="min-h-[44px] px-5 bg-cream border-2 border-border rounded-[12px] text-[17px] font-bold text-charcoal disabled:opacity-30"
                >
                  −
                </button>
                <div className="text-center">
                  <p className="text-[32px] font-bold text-charcoal leading-none">{lmntUsed}</p>
                  <p className="text-[12px] text-warmGray">packets used</p>
                </div>
                <button
                  onClick={() => handleLmntChange(Math.min(target, lmntUsed + 1))}
                  disabled={lmntUsed >= target || savingLmnt}
                  className="min-h-[44px] px-5 bg-burgundy rounded-[12px] text-[17px] font-bold text-white disabled:opacity-30"
                >
                  +
                </button>
              </div>

              {lmntUsed >= target && (
                <p className="text-center text-[14px] text-success font-semibold mt-3">
                  All {target} packets used ✓
                </p>
              )}

              <button
                onDoubleClick={() => handleSetTarget(null)}
                className="mt-3 text-[12px] text-inactive underline w-full text-center"
              >
                Change target (double-tap)
              </button>
            </div>
          )}
        </div>

        {/* Recovery checklist */}
        <div className="bg-cardBg border border-border rounded-[18px] overflow-hidden">
          {RECOVERY_ITEMS.map(({ key, label }, i) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors active:opacity-70
                ${i < RECOVERY_ITEMS.length - 1 ? 'border-b border-border' : ''}
              `}
            >
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors
                  ${checklist[key] ? 'bg-success border-success' : 'border-border bg-cream'}
                `}
              >
                {checklist[key] && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l4 4 6-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-[16px] font-medium ${checklist[key] ? 'text-success' : 'text-charcoal'}`}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Status */}
        {saved && (
          <div
            className={`rounded-[14px] p-4 text-center font-semibold text-[16px]
              ${allChecked ? 'bg-green-50 text-success border border-success' : 'bg-amber-50 text-warning border border-warning'}
            `}
          >
            {allChecked ? 'Recovery complete ✓' : 'Recovery incomplete'}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full min-h-[54px] bg-burgundy text-white text-[17px] font-semibold rounded-[14px] active:opacity-80 disabled:opacity-50 transition-opacity"
        >
          {saving ? '...' : 'Save Recovery'}
        </button>
      </div>
    </div>
  )
}
