import { useState } from 'react'
import { STARTING_SOON_OPTIONS } from '../constants'
import { updateStartingSoon } from '../lib/supabase'

export default function PlanningAscent({ athlete, onBack, showToast }) {
  const [saving, setSaving] = useState(false)

  async function handleSelect(value) {
    if (!athlete) return
    setSaving(true)
    try {
      await updateStartingSoon(athlete.id, value)
      if (value) {
        showToast(`Set: ${value}`)
      } else {
        showToast('Starting soon cleared')
      }
      onBack()
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setSaving(false)
    }
  }

  const current = athlete?.starting_soon

  return (
    <div className="min-h-dvh bg-cream">
      <div className="px-4 pt-12 pb-4">
        <button onClick={onBack} className="text-burgundy text-[16px] font-semibold mb-3">
          ← Back
        </button>
        <h1 className="text-[24px] font-bold text-charcoal">Planning another ascent?</h1>
        <p className="text-[15px] text-warmGray mt-1">
          Only set this if you want others to know you may start soon.
        </p>
      </div>

      <div className="px-4 pb-6 space-y-3">
        {STARTING_SOON_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={saving}
            className={`w-full min-h-[56px] rounded-[14px] flex items-center px-5 gap-3 text-left transition-all active:scale-[0.98]
              ${current === option
                ? 'bg-burgundy text-white border-2 border-burgundy'
                : 'bg-cardBg border-2 border-border text-charcoal'
              }
              ${saving ? 'opacity-50' : ''}
            `}
          >
            <span className="text-[17px] font-semibold">{option}</span>
            {current === option && (
              <span className="ml-auto text-[13px] opacity-80">Current</span>
            )}
          </button>
        ))}

        {/* Clear option */}
        <button
          onClick={() => handleSelect(null)}
          disabled={saving}
          className={`w-full min-h-[56px] rounded-[14px] flex items-center px-5 gap-3 text-left border-2 transition-all active:scale-[0.98]
            ${!current
              ? 'border-border bg-cream text-warmGray'
              : 'border-border bg-cream text-warmGray hover:border-charcoal'
            }
            ${saving ? 'opacity-50' : ''}
          `}
        >
          <span className="text-[17px] font-semibold">Clear Starting Soon</span>
        </button>
      </div>
    </div>
  )
}
