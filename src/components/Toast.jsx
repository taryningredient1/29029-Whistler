import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success'
    ? 'bg-success text-white'
    : type === 'warning'
    ? 'bg-warning text-white'
    : 'bg-charcoal text-white'

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm font-semibold shadow-lg transition-all ${bgColor}`}
      style={{ minWidth: '180px', textAlign: 'center' }}
    >
      {message}
    </div>
  )
}
