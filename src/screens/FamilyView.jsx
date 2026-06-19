import { useAthletes } from '../hooks/useAthletes'
import AthletePhoto from '../components/AthletePhoto'
import MountainTriangles from '../components/MountainTriangles'
import { formatRelativeTime } from '../utils/time'
import { STATUS_COLORS, STATUS_ICONS } from '../constants'

// Can be rendered inline (from the Family tab) or standalone (via /family URL)
export default function FamilyView({ athletes: propAthletes, loading: propLoading, inline = false }) {
  // If used standalone (URL route), fetch own athletes
  const hook = useAthletes()
  const athletes = propAthletes ?? hook.athletes
  const loading = propLoading ?? hook.loading

  const allFinished = athletes.length > 0 && athletes.every((a) => a.current_status === 'Finished')
  const allSleeping = athletes.length > 0 && athletes.every((a) => a.current_status === 'Sleeping')
  const noStartingSoon = athletes.every((a) => !a.starting_soon)

  const familyAthletes = athletes.map((a) => ({
    ...a,
    // Hide recovery details for family
    recovery_water: undefined,
    recovery_electrolytes: undefined,
    recovery_fuel: undefined,
    recovery_bathroom: undefined,
    recovery_ready: undefined,
    recovery_complete: undefined,
  }))

  return (
    <div className={`bg-cream ${inline ? 'min-h-dvh' : 'min-h-screen'}`}>
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-cream sticky top-0 z-10">
        {!inline && (
          <div className="flex items-center gap-2 mb-2">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <polygon points="10,2 19,18 1,18" fill="#7A1E2C" />
            </svg>
          </div>
        )}
        <h1 className="text-[24px] font-bold text-charcoal">29029 Whistler</h1>
        <p className="text-[14px] text-warmGray mt-0.5">Follow the team</p>
      </div>

      <div className="px-4 pb-6 space-y-3">
        {loading ? (
          <LoadingSkeleton />
        ) : allFinished ? (
          <EmptyMessage text="All ascents complete. 🏔️" />
        ) : allSleeping ? (
          <EmptyMessage text="The team is resting." />
        ) : (
          familyAthletes.map((athlete) => (
            <FamilyCard key={athlete.id} athlete={athlete} />
          ))
        )}
      </div>
    </div>
  )
}

function FamilyCard({ athlete }) {
  const isNeedHelp = athlete.current_status === 'Need Help'
  const isFinished = athlete.current_status === 'Finished'
  const statusColor = STATUS_COLORS[athlete.current_status] || 'text-charcoal'
  const statusIcon = STATUS_ICONS[athlete.current_status] || ''

  return (
    <div
      className={`rounded-[18px] p-4 border
        ${isNeedHelp ? 'bg-red-50 border-urgent' : isFinished ? 'bg-gray-50 border-border' : 'bg-cardBg border-border'}
      `}
    >
      <div className="flex items-start gap-3">
        <AthletePhoto athlete={athlete} size="md" />
        <div className="flex-1 min-w-0">
          <p className="text-[18px] font-bold text-charcoal">{athlete.name}</p>
          <p className={`text-[16px] font-semibold mt-0.5 ${isNeedHelp ? 'text-urgent' : statusColor}`}>
            {statusIcon} {athlete.current_status}
          </p>
          <div className="mt-2">
            <MountainTriangles completed={athlete.completed_ascents} size="sm" showCount={false} />
          </div>
          <p className="text-[14px] text-warmGray mt-1">
            Ascent {athlete.current_ascent} · {athlete.completed_ascents} completed
          </p>
          {athlete.starting_soon && (
            <span className="inline-block mt-1.5 bg-burgundy text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
              {athlete.starting_soon}
            </span>
          )}
          <p className="text-[13px] text-inactive mt-1.5">
            Updated {formatRelativeTime(athlete.last_updated)}
          </p>
        </div>
      </div>
    </div>
  )
}

function EmptyMessage({ text }) {
  return (
    <div className="text-center py-16">
      <p className="text-[16px] text-warmGray">{text}</p>
    </div>
  )
}

function LoadingSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="bg-cardBg border border-border rounded-[18px] p-4 animate-pulse">
      <div className="flex gap-3">
        <div className="w-14 h-14 rounded-full bg-inactive" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-inactive rounded w-24" />
          <div className="h-3 bg-inactive rounded w-20" />
        </div>
      </div>
    </div>
  ))
}
