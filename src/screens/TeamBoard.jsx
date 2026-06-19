import AthleteCard from '../components/AthleteCard'

export default function TeamBoard({ athletes, loading, onAthletePress }) {
  return (
    <div className="min-h-dvh bg-cream">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-cream sticky top-0 z-10">
        <h1 className="text-[24px] font-bold text-charcoal">29029 Whistler</h1>
        <p className="text-[14px] text-warmGray mt-0.5">10 women on the mountain</p>
        <p className="text-[13px] text-inactive">Updated live</p>
      </div>

      {/* Cards */}
      <div className="px-4 pb-6 space-y-3">
        {loading ? (
          <LoadingSkeleton />
        ) : athletes.length === 0 ? (
          <EmptyState />
        ) : (
          athletes.map((athlete) => (
            <AthleteCard
              key={athlete.id}
              athlete={athlete}
              onClick={() => onAthletePress(athlete.id)}
            />
          ))
        )}
      </div>
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
          <div className="h-3 bg-inactive rounded w-32" />
        </div>
      </div>
    </div>
  ))
}

function EmptyState() {
  return (
    <div className="text-center py-16 text-warmGray">
      <p className="text-[16px]">The team is resting.</p>
    </div>
  )
}
