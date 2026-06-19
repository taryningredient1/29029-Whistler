import { useEffect } from 'react'

function Mountain29029({ color = 'white', size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points="50,6 96,92 4,92" stroke={color} strokeWidth="4" strokeLinejoin="round" fill="none"/>
      <line x1="50" y1="6" x2="25" y2="92" stroke={color} strokeWidth="3"/>
      <line x1="50" y1="6" x2="75" y2="92" stroke={color} strokeWidth="3"/>
      <polygon points="50,38 68,72 32,72" stroke={color} strokeWidth="3" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

export default function Toast({ message, type = 'success', onClose }) {
  const duration = type === 'celebration' ? 4000 : 2500

  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  if (type === 'celebration') {
    return (
      <div
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 shadow-xl"
        style={{ minWidth: '260px', maxWidth: '320px' }}
      >
        <div className="bg-[#7A2A3A] rounded-[20px] px-5 py-4 flex items-center gap-4">
          <Mountain29029 color="white" size={36} />
          <p className="text-white text-[15px] font-semibold leading-snug">{message}</p>
        </div>
      </div>
    )
  }

  const bgColor = type === 'success'
    ? 'bg-success text-white'
    : type === 'warning'
    ? 'bg-warning text-white'
    : 'bg-charcoal text-white'

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm font-semibold shadow-lg ${bgColor}`}
      style={{ minWidth: '180px', textAlign: 'center' }}
    >
      {message}
    </div>
  )
}
