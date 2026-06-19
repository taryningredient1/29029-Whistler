import { useState, useEffect } from 'react'
import { fetchAthletes, subscribeToAthletes } from '../lib/supabase'
import { STATUS_SORT_ORDER } from '../constants'

export function useAthletes() {
  const [athletes, setAthletes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let channel

    async function load() {
      try {
        const data = await fetchAthletes()
        setAthletes(sortAthletes(data))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()

    // Subscribe to realtime changes
    channel = subscribeToAthletes((payload) => {
      setAthletes((prev) => {
        const updated = prev.map((a) =>
          a.id === payload.new?.id ? payload.new : a
        )
        return sortAthletes(updated)
      })
    })

    return () => {
      if (channel) channel.unsubscribe()
    }
  }, [])

  return { athletes, loading, error, setAthletes }
}

export function sortAthletes(athletes) {
  return [...athletes].sort((a, b) => {
    const orderA = STATUS_SORT_ORDER[a.current_status] ?? 99
    const orderB = STATUS_SORT_ORDER[b.current_status] ?? 99
    if (orderA !== orderB) return orderA - orderB
    // Within same status: most recently updated first
    return new Date(b.last_updated) - new Date(a.last_updated)
  })
}
