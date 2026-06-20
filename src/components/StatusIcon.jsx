// Color-matched SVG icons for each status
export default function StatusIcon({ status, size = 18 }) {
  const rose = '#A85878'
  const p = { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', style: { display: 'inline-block', verticalAlign: 'middle', marginRight: 4 } }

  switch (status) {
    case 'Starting Soon':
      return (
        <svg {...p}><polygon points="4,3 17,10 4,17" fill={rose} /></svg>
      )
    case 'Climbing':
      return (
        <svg {...p}><polygon points="10,2 19,18 1,18" fill={rose} strokeLinejoin="round" /></svg>
      )
    case 'Summit':
      return (
        <svg {...p}>
          <polygon points="10,2 19,18 1,18" stroke={rose} strokeWidth="2" strokeLinejoin="round" />
          <polygon points="10,7 16,17 4,17" fill={rose} />
        </svg>
      )
    case 'Fueling at Top':
    case 'Fueling at Bottom':
      return (
        <svg {...p}>
          <circle cx="10" cy="8" r="5" stroke={rose} strokeWidth="2" />
          <rect x="8" y="12" width="4" height="5" rx="1" fill={rose} />
        </svg>
      )
    case 'Gondola Down':
      return (
        <svg {...p}>
          <line x1="2" y1="3" x2="18" y2="3" stroke={rose} strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="3" x2="10" y2="6" stroke={rose} strokeWidth="2" />
          <polygon points="10,17 17,6 3,6" fill={rose} />
        </svg>
      )
    case 'Wellness Room':
      return (
        <svg {...p}>
          <path d="M10 16 C10 16 3 11 3 6.5 C3 4 5 2.5 7 2.5 C8.5 2.5 9.5 3.5 10 4 C10.5 3.5 11.5 2.5 13 2.5 C15 2.5 17 4 17 6.5 C17 11 10 16 10 16Z" fill={rose} />
        </svg>
      )
    case 'Recovery':
      return (
        <svg {...p}>
          <path d="M10 16 C10 16 3 11 3 6.5 C3 4 5 2.5 7 2.5 C8.5 2.5 9.5 3.5 10 4 C10.5 3.5 11.5 2.5 13 2.5 C15 2.5 17 4 17 6.5 C17 11 10 16 10 16Z" fill={rose} />
        </svg>
      )
    case 'Sleeping':
      return (
        <svg {...p}>
          {/* Small z — top right */}
          <polyline points="11,3 16,3 11,8 16,8" stroke={rose} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Large Z — bottom left */}
          <polyline points="3,10 12,10 3,17 12,17" stroke={rose} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    case 'Finished':
      return (
        <svg {...p}>
          <polyline points="2,10 8,16 18,4" stroke={rose} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return <svg {...p}><circle cx="10" cy="10" r="4" fill={rose} /></svg>
  }
}
