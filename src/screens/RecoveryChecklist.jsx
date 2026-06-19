import { useState, useEffect } from 'react'
import { updateLmntTarget, updateLmntUsed } from '../lib/supabase'

export default function RecoveryChecklist({ athlete, onBack, showToast }) {
  const [lmntUsed, setLmntUsed] = useState(0)
  const [savingLmnt, setSavingLmnt] = useState(false)

  useEffect(() => {
    if (athlete) {
      setLmntUsed(athlete.lmnt_used || 0)
    }
  }, [athlete])

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
        <h1 className="text-[24px] font-bold text-charcoal">LMNT Tracker</h1>
        <p className="text-[15px] text-warmGray mt-1">Track your packets across the event.</p>
      </div>

      <div className="px-4 pb-6">
        <div className="bg-cardBg border border-border rounded-[18px] p-5">

          {!target ? (
            <div>
              <p className="text-[16px] font-bold text-charcoal mb-1">Set your target</p>
              <p className="text-[14px] text-warmGray mb-4">How many packets are you targeting for the full event?</p>
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
            <div>
              <p className="text-[16px] font-bold text-charcoal mb-3">LMNT Packets</p>

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

              {/* +/- counter */}
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
                className="mt-4 text-[12px] text-inactive underline w-full text-center"
              >
                Change target (double-tap)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
