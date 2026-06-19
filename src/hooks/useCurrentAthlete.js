import { useState } from 'react'

const STORAGE_KEY = '29029_current_athlete_id'

export function useCurrentAthlete() {
  const [currentAthleteId, setCurrentAthleteIdState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || null
  )

  function setCurrentAthleteId(id) {
    localStorage.setItem(STORAGE_KEY, id)
    setCurrentAthleteIdState(id)
  }

  function clearCurrentAthlete() {
    localStorage.removeItem(STORAGE_KEY)
    setCurrentAthleteIdState(null)
  }

  return { currentAthleteId, setCurrentAthleteId, clearCurrentAthlete }
}
