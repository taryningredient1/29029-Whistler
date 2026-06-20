import { useAthletes } from '../hooks/useAthletes'
import AthletePhoto from '../components/AthletePhoto'
import MountainTriangles from '../components/MountainTriangles'
import StatusIcon from '../components/StatusIcon'
import { formatRelativeTime } from '../utils/time'
import { STATUS_COLORS } from '../constants'

// Can be rendered inline (from the Family tab) or standalone (via /family URL)
export default function FamilyView({ athletes: propAthletes, loading: propLoading, inline = false }) {
  // Only fetch own data when used standalone (no props passed)
  const hook = useAthletes()
  const athletes = propAthletes !== undefined ? propAthletes : hook.athletes
  const loading = propLoading !== undefined ? propLoading : hook.loading
  const error = propAthletes !== undefined ? null : hook.error

  const allFinished = athletes.length > 0 && athletes.every((a) => a.current_status === 'Finished')
  const allSleeping = athletes.length > 0 && athletes.every((a) => a.current_status === 'Sleeping')

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
              <polygon points="10,2 19,18 1,18" fill="#A85878" />
            </svg>
          </div>
        )}
        <h1 className="text-[24px] font-bold text-charcoal">29029 Whistler</h1>
        <p className="text-[14px] text-warmGray mt-0.5">Follow the team</p>
      </div>

      <div className="px-4 pb-6 space-y-3">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <EmptyMessage text="Couldn't load athlete data. Check your connection." />
        ) : athletes.length === 0 ? (
          <EmptyMessage text="No athletes found." />
        ) : allFinished ? (
          <EmptyMessage text="All ascents complete. 🏔️" />
        ) : allSleeping ? (
          <PreRacePage />
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
  const isFinished = athlete.current_status === 'Finished'
  const statusColor = STATUS_COLORS[athlete.current_status] || 'text-charcoal'

  return (
    <div className={`rounded-[18px] p-4 border ${isFinished ? 'bg-gray-50 border-border' : 'bg-cardBg border-border'}`}>
      <div className="flex items-start gap-3">
        <AthletePhoto athlete={athlete} size="md" />
        <div className="flex-1 min-w-0">
          <p className="text-[18px] font-bold text-charcoal">{athlete.name}</p>
          <p className={`text-[16px] font-semibold mt-0.5 flex items-center ${statusColor}`}>
            <StatusIcon status={athlete.current_status} size={16} />
            {athlete.current_status}
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

function PreRacePage() {
  return (
    <div className="text-center py-8 px-2">
      <svg width="64" height="64" viewBox="0 0 100 100" fill="none" style={{ margin: '0 auto 20px' }}>
        <polygon points="50,6 96,92 4,92" stroke="#A85878" strokeWidth="4" strokeLinejoin="round" fill="none"/>
        <line x1="50" y1="6" x2="25" y2="92" stroke="#A85878" strokeWidth="3"/>
        <line x1="50" y1="6" x2="75" y2="92" stroke="#A85878" strokeWidth="3"/>
        <polygon points="50,38 68,72 32,72" stroke="#A85878" strokeWidth="3" strokeLinejoin="round" fill="none"/>
      </svg>
      <h2 className="text-[22px] font-bold text-charcoal mb-2">They're ready.</h2>
      <p className="text-[16px] text-warmGray mb-6 leading-relaxed">
        10 women are about to take on 29,029 feet of climbing. Your support means everything.
      </p>
      <div className="bg-cardBg border border-border rounded-[18px] p-5 text-left mb-4">
        <p className="text-[15px] font-semibold text-charcoal mb-1">📍 Check back soon</p>
        <p className="text-[14px] text-warmGray leading-relaxed">
          Once the challenge begins, you'll see live updates from each athlete right here.
        </p>
      </div>
      <div className="flex gap-3 justify-center mt-2">
        <div className="bg-cardBg border border-border rounded-[14px] px-4 py-3 text-center">
          <p className="text-[20px] font-bold text-burgundy">8</p>
          <p className="text-[11px] text-warmGray">ascents</p>
        </div>
        <div className="bg-cardBg border border-border rounded-[14px] px-4 py-3 text-center">
          <p className="text-[20px] font-bold text-burgundy">10</p>
          <p className="text-[11px] text-warmGray">athletes</p>
        </div>
        <div className="bg-cardBg border border-border rounded-[14px] px-4 py-3 text-center">
          <p className="text-[20px] font-bold text-burgundy">36h</p>
          <p className="text-[11px] text-warmGray">challenge</p>
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
