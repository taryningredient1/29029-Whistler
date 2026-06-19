export function formatRelativeTime(isoString) {
  if (!isoString) return 'unknown'
  const diff = (Date.now() - new Date(isoString)) / 1000

  if (diff < 30) return 'just now'
  if (diff < 60) return `${Math.floor(diff)} sec ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`
  return `${Math.floor(diff / 86400)} days ago`
}
