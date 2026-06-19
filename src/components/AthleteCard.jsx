import AthletePhoto from './AthletePhoto'
import MountainTriangles from './MountainTriangles'
import StatusIcon from './StatusIcon'
import { STATUS_COLORS } from '../constants'
import { formatRelativeTime } from '../utils/time'

export default function AthleteCard({ athlete, onClick }) {
  const isFinished = athlete.current_status === 'Finished'

  const cardClass = `rounded-[18px] p-4 border cursor-pointer transition-colors active:opacity-80 ${
    isFinished ? 'bg-gray-50 border-border' : 'bg-cardBg border-border'
  }`

  const statusColor = STATUS_COLORS[athlete.current_status] || 'text-charcoal'

  return (
    <div className={cardClass} onClick={onClick}>
      <div className="flex items-start gap-3">
        <AthletePhoto athlete={athlete} size="md" />

        <div className="flex-1 min-w-0">
          {/* Name + status */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[18px] font-bold text-charcoal leading-tight">
                {athlete.name}
              </p>
              <p className={`text-[16px] font-semibold mt-0.5 flex items-center ${statusColor}`}>
                <StatusIcon status={athlete.current_status} size={16} />
                {athlete.current_status}
              </p>
            </div>
          </div>

          {/* Triangles */}
          <div className="mt-2">
            <MountainTriangles completed={athlete.completed_ascents} size="sm" showCount={false} />
          </div>

          {/* Ascent text */}
          <p className="text-[14px] text-warmGray mt-1">
            Ascent {athlete.current_ascent} · {athlete.completed_ascents} completed
          </p>

          {/* Starting soon chip */}
          {athlete.starting_soon && (
            <span className="inline-block mt-1.5 bg-burgundy text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
              {athlete.starting_soon}
            </span>
          )}

          {/* Timestamp */}
          <p className="text-[13px] text-inactive mt-1.5">
            Updated {formatRelativeTime(athlete.last_updated)}
          </p>
        </div>
      </div>
    </div>
  )
}
