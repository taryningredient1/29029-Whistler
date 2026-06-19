import AthletePhoto from '../components/AthletePhoto'
import MountainTriangles from '../components/MountainTriangles'
import { formatRelativeTime } from '../utils/time'
import { STATUS_COLORS, STATUS_ICONS } from '../constants'

export default function AthleteDetail({
  athlete,
  currentAthlete,
  onBack,
  onNavigate,
  showToast,
}) {
  if (!athlete) return null

  const isSelf = currentAthlete?.id === athlete.id
  const statusColor = STATUS_COLORS[athlete.current_status] || 'text-charcoal'
  const statusIcon = STATUS_ICONS[athlete.current_status] || ''

  return (
    <div className="min-h-dvh bg-cream">
      {/* Header */}
      <div className="px-4 pt-12 pb-2">
        <button onClick={onBack} className="text-burgundy text-[16px] font-semibold mb-4">
          ← Team
        </button>
      </div>

      <div className="px-4 pb-6 space-y-4">
        {/* Profile card */}
        <div className="bg-cardBg border border-border rounded-[18px] p-5">
          <div className="flex items-center gap-4">
            <AthletePhoto athlete={athlete} size="xl" />
            <div>
              <h1 className="text-[22px] font-bold text-charcoal">{athlete.name}</h1>
              <p className={`text-[17px] font-semibold mt-0.5 ${athlete.current_status === 'Need Help' ? 'text-urgent' : statusColor}`}>
                {statusIcon} {athlete.current_status}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <MountainTriangles completed={athlete.completed_ascents} size="sm" showCount={true} />

            <div className="flex gap-6">
              <div>
                <p className="text-[13px] text-warmGray">Current Ascent</p>
                <p className="text-[28px] font-bold text-charcoal">{athlete.current_ascent}</p>
              </div>
              <div>
                <p className="text-[13px] text-warmGray">Completed</p>
                <p className="text-[28px] font-bold text-charcoal">{athlete.completed_ascents}</p>
              </div>
            </div>

            <p className="text-[13px] text-inactive">
              Updated {formatRelativeTime(athlete.last_updated)}
            </p>

            {athlete.starting_soon && (
              <span className="inline-block bg-burgundy text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                {athlete.starting_soon}
              </span>
            )}

            {/* Recovery — only visible to athletes/admin, not family */}
            {currentAthlete && (
              <div className="pt-2 border-t border-border">
                <p className="text-[13px] text-warmGray">Recovery</p>
                <p className={`text-[15px] font-semibold mt-0.5 ${athlete.recovery_complete ? 'text-success' : 'text-warmGray'}`}>
                  {athlete.recovery_complete ? 'Complete ✓' : 'Incomplete'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons if viewing self */}
        {isSelf && (
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('update-status')}
              className="w-full min-h-[54px] bg-burgundy text-white text-[17px] font-semibold rounded-[14px] active:opacity-80"
            >
              Update Status
            </button>
            <button
              onClick={() => onNavigate('planning-ascent')}
              className="w-full min-h-[54px] bg-cardBg border-2 border-border text-charcoal text-[17px] font-semibold rounded-[14px] active:opacity-70"
            >
              Planning Another Ascent
            </button>
            <button
              onClick={() => onNavigate('recovery')}
              className="w-full min-h-[54px] bg-cardBg border-2 border-border text-charcoal text-[17px] font-semibold rounded-[14px] active:opacity-70"
            >
              Recovery Checklist
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
