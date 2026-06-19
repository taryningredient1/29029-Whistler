import { TOTAL_ASCENTS } from '../constants'

export default function MountainTriangles({ completed = 0, size = 'sm', showCount = true }) {
  const triangleSize = size === 'lg' ? 20 : 14

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: TOTAL_ASCENTS }).map((_, i) => (
          <svg
            key={i}
            width={triangleSize}
            height={triangleSize}
            viewBox="0 0 20 20"
            aria-label={i < completed ? 'completed ascent' : 'remaining ascent'}
          >
            <polygon
              points="10,2 19,18 1,18"
              fill={i < completed ? '#A85878' : 'none'}
              stroke={i < completed ? '#A85878' : '#C8B8A4'}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
      {showCount && (
        <span className="text-sm text-warmGray">
          {completed} completed
        </span>
      )}
    </div>
  )
}
