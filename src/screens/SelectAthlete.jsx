import AthletePhoto from '../components/AthletePhoto'

export default function SelectAthlete({ athletes, onSelect }) {
  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      {/* Header */}
      <div className="px-4 pt-14 pb-6">
        <h1 className="text-[24px] font-bold text-charcoal">29029 Whistler</h1>
        <p className="text-[16px] text-warmGray mt-1">Welcome to the Team! Who's checking in?</p>
      </div>

      {/* Athlete list */}
      <div className="flex-1 px-4 space-y-3">
        {athletes.map((athlete) => (
          <button
            key={athlete.id}
            onClick={() => onSelect(athlete.id)}
            className="w-full bg-cardBg border border-border rounded-[18px] p-4 flex items-center gap-4 active:opacity-70 transition-opacity text-left"
          >
            <AthletePhoto athlete={athlete} size="md" />
            <span className="text-[18px] font-bold text-charcoal">
              {athlete.name}
            </span>
          </button>
        ))}
      </div>

      <p className="text-center text-[13px] text-inactive pb-8 pt-4">
        This is saved on your device only.
      </p>
    </div>
  )
}
