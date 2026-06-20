import { ATHLETE_COLORS } from '../constants'

// Circular athlete profile photo with fallback initials
export default function AthletePhoto({ athlete, size = 'md' }) {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-24 h-24 text-2xl',
  }

  const name = athlete?.name || ''
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Each athlete has her own unique color
  const color = ATHLETE_COLORS[name] || '#8A7C6E'

  if (athlete.photo_url) {
    return (
      <img
        src={athlete.photo_url}
        alt={athlete.name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-border flex-shrink-0`}
      />
    )
  }

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ring-2 ring-border`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  )
}
