import AthletePhoto from '../components/AthletePhoto'
import MountainTriangles from '../components/MountainTriangles'
import { formatRelativeTime } from '../utils/time'
import { STATUS_ICONS } from '../constants'

export default function MyDashboard({
  athlete,
  loading,
  onUpdateStatus,
  onUpdateAscents,
  onPlanningAscent,
  onRecovery,
}) {
  if (loading || !athlete) {
    return <div className="min-h-dvh bg-cream" />
  }

  const statusIcon = STATUS_ICONS[athlete.current_status] || ''

  return (
    <div className="min-h-dvh bg-cream">
      {/* Header */}
      <div className="px-4 pt-12 pb-2">
        <h1 className="text-[24px] font-bold text-charcoal">Hi, {athlete.name}</h1>
        <p className="text-[15px] text-warmGray mt-0.5">One ascent at a time.</p>
      </div>

      <div className="px-4 pb-6 space-y-4 mt-2">
        {/* Main status card */}
        <div className="bg-cardBg border border-border rounded-[18px] p-5">
          <div className="flex items-start gap-4">
            <AthletePhoto athlete={athlete} size="lg" />
            <div className="flex-1">
              <p className="text-[13px] text-warmGray uppercase tracking-wide font-semibold">Current Status</p>
              <p className="text-[20px] font-bold text-charcoal mt-0.5">
                {statusIcon} {athlete.current_status}
              </p>
              {athlete.starting_soon && (
                <span className="inline-block mt-2 bg-burgundy text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                  {athlete.starting_soon}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <MountainTriangles completed={athlete.completed_ascents} size="sm" showCount={true} />
          </div>

          <div className="mt-3 flex gap-6">
            <div>
              <p className="text-[13px] text-warmGray">Current Ascent</p>
              <p className="text-[28px] font-bold text-charcoal leading-tight">{athlete.current_ascent}</p>
            </div>
            <div>
              <p className="text-[13px] text-warmGray">Completed</p>
              <p className="text-[28px] font-bold text-charcoal leading-tight">{athlete.completed_ascents}</p>
            </div>
          </div>

          <p className="text-[13px] text-inactive mt-3">
            Updated {formatRelativeTime(athlete.last_updated)}
          </p>
        </div>

        {/* Action buttons */}
        <PrimaryButton onClick={onUpdateStatus}>
          Update Status
        </PrimaryButton>

        <SecondaryButton onClick={onUpdateAscents}>
          Update Ascents
        </SecondaryButton>

        <SecondaryButton onClick={onPlanningAscent}>
          Planning Another Ascent
        </SecondaryButton>

        <SecondaryButton onClick={onRecovery}>
          Recovery Checklist
        </SecondaryButton>
      </div>
    </div>
  )
}

function PrimaryButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full min-h-[54px] bg-burgundy text-white text-[17px] font-semibold rounded-[14px] active:opacity-80 transition-opacity"
    >
      {children}
    </button>
  )
}

function SecondaryButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full min-h-[54px] bg-cardBg border-2 border-border text-charcoal text-[17px] font-semibold rounded-[14px] active:opacity-70 transition-opacity"
    >
      {children}
    </button>
  )
}
