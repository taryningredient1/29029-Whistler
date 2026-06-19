import { useState } from 'react'
import MountainTriangles from '../components/MountainTriangles'
import { markAscentComplete, undoLastAscent } from '../lib/supabase'

export default function UpdateAscents({ athlete, onBack, showToast }) {
  const [saving, setSaving] = useState(false)
  const [undoConfirm, setUndoConfirm] = useState(false)

  if (!athlete) return null

  const canMarkComplete = athlete.completed_ascents < 8
  const canUndo = athlete.completed_ascents > 0

  async function handleMarkComplete() {
    setSaving(true)
    try {
      const newCompleted = await markAscentComplete(athlete)
      const isFinished = newCompleted >= 8
      if (isFinished) {
        showToast(`All ${newCompleted} ascents complete! You've got this, ${athlete.name}.`, 'celebration')
      } else {
        showToast(`Ascent ${athlete.current_ascent} complete! You've got this, ${athlete.name}.`, 'celebration')
      }
      onBack()
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleUndo() {
    setUndoConfirm(false)
    setSaving(true)
    try {
      await undoLastAscent(athlete)
      showToast('Ascent undone')
      onBack()
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-dvh bg-cream">
      <div className="px-4 pt-12 pb-4">
        <button onClick={onBack} className="text-burgundy text-[16px] font-semibold mb-3">
          ← Back
        </button>
        <h1 className="text-[24px] font-bold text-charcoal">Ascents</h1>
      </div>

      <div className="px-4 pb-6 space-y-5">
        {/* Completed ascents */}
        <div className="bg-cardBg border border-border rounded-[18px] p-5">
          <p className="text-[13px] text-warmGray uppercase tracking-wide font-semibold">Completed Ascents</p>
          <p className="text-[56px] font-bold text-charcoal leading-none mt-1">
            {athlete.completed_ascents}
          </p>
          <div className="mt-3">
            <MountainTriangles completed={athlete.completed_ascents} size="lg" showCount={false} />
          </div>
        </div>

        {/* Current ascent */}
        <div className="bg-cardBg border border-border rounded-[18px] p-5">
          <p className="text-[13px] text-warmGray uppercase tracking-wide font-semibold">Current Ascent</p>
          <p className="text-[56px] font-bold text-charcoal leading-none mt-1">
            {athlete.current_ascent}
          </p>
        </div>

        {/* Mark complete */}
        {canMarkComplete && (
          <button
            onClick={handleMarkComplete}
            disabled={saving}
            className="w-full min-h-[54px] bg-burgundy text-white text-[17px] font-semibold rounded-[14px] active:opacity-80 disabled:opacity-50 transition-opacity"
          >
            {saving ? '...' : `+ Mark Current Ascent Complete`}
          </button>
        )}

        {/* Undo */}
        {canUndo && (
          <button
            onClick={() => setUndoConfirm(true)}
            disabled={saving}
            className="w-full min-h-[54px] bg-cardBg border-2 border-border text-charcoal text-[17px] font-semibold rounded-[14px] active:opacity-70 disabled:opacity-50 transition-opacity"
          >
            Undo Last Ascent
          </button>
        )}
      </div>

      {/* Undo confirmation modal */}
      {undoConfirm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center">
          <div className="bg-cardBg rounded-t-[24px] p-6 w-full max-w-md">
            <p className="text-[18px] font-bold text-charcoal text-center">
              Undo last completed ascent?
            </p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setUndoConfirm(false)}
                className="flex-1 min-h-[54px] bg-cream border-2 border-border rounded-[14px] text-[17px] font-semibold text-charcoal"
              >
                Cancel
              </button>
              <button
                onClick={handleUndo}
                className="flex-1 min-h-[54px] bg-charcoal text-white rounded-[14px] text-[17px] font-semibold"
              >
                Yes, Undo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
