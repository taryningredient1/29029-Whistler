import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. See .env.example')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fetch all athletes
export async function fetchAthletes() {
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .order('name')
  if (error) throw error
  return data
}

// Update an athlete's status
export async function updateStatus(id, status) {
  const updates = {
    current_status: status,
    last_updated: new Date().toISOString(),
  }
  // If finished, fill all ascents
  if (status === 'Finished') {
    updates.completed_ascents = 8
    updates.current_ascent = 8
  }
  const { error } = await supabase
    .from('athletes')
    .update(updates)
    .eq('id', id)
  if (error) throw error
}

// Mark current ascent complete
export async function markAscentComplete(athlete) {
  const newCompleted = Math.min(athlete.completed_ascents + 1, 8)
  const newCurrent = Math.min(newCompleted + 1, 8)
  const isFinished = newCompleted >= 8

  const { error } = await supabase
    .from('athletes')
    .update({
      completed_ascents: newCompleted,
      current_ascent: isFinished ? 8 : newCurrent,
      current_status: isFinished ? 'Finished' : 'Summit',
      last_updated: new Date().toISOString(),
      recovery_water: false,
      recovery_electrolytes: false,
      recovery_fuel: false,
      recovery_bathroom: false,
      recovery_ready: false,
      recovery_complete: false,
    })
    .eq('id', athlete.id)
  if (error) throw error
  return newCompleted
}

// Undo last ascent
export async function undoLastAscent(athlete) {
  const newCompleted = Math.max(athlete.completed_ascents - 1, 0)
  const newCurrent = newCompleted + 1
  const { error } = await supabase
    .from('athletes')
    .update({
      completed_ascents: newCompleted,
      current_ascent: newCurrent,
      last_updated: new Date().toISOString(),
    })
    .eq('id', athlete.id)
  if (error) throw error
}

// Update starting soon
export async function updateStartingSoon(id, value) {
  const { error } = await supabase
    .from('athletes')
    .update({
      starting_soon: value || null,
      last_updated: new Date().toISOString(),
    })
    .eq('id', id)
  if (error) throw error
}

// Update recovery checklist
export async function updateRecovery(id, checklist) {
  const allChecked = Object.values(checklist).every(Boolean)
  const { error } = await supabase
    .from('athletes')
    .update({
      recovery_water: checklist.water,
      recovery_electrolytes: checklist.electrolytes,
      recovery_fuel: checklist.fuel,
      recovery_bathroom: checklist.bathroom,
      recovery_ready: checklist.ready,
      recovery_complete: allChecked,
      last_updated: new Date().toISOString(),
    })
    .eq('id', id)
  if (error) throw error
  return allChecked
}

// Set LMNT target (12 or 18)
export async function updateLmntTarget(id, target) {
  const { error } = await supabase
    .from('athletes')
    .update({ lmnt_target: target })
    .eq('id', id)
  if (error) throw error
}

// Update LMNT packets used
export async function updateLmntUsed(id, used) {
  const { error } = await supabase
    .from('athletes')
    .update({ lmnt_used: used })
    .eq('id', id)
  if (error) throw error
}

// Subscribe to realtime athlete updates
export function subscribeToAthletes(callback) {
  return supabase
    .channel('athletes-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'athletes' },
      callback
    )
    .subscribe()
}
