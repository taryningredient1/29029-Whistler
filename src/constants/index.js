export const STATUSES = [
  'Starting Soon',
  'Climbing',
  'Summit',
  'Eating at Top',
  'Gondola Down',
  'Recovery',
  'Eating at Bottom',
  'Sleeping',
  'Finished',
  'Need Help',
]

// Sort order for Team Board
export const STATUS_SORT_ORDER = {
  'Need Help': 0,
  'Climbing': 1,
  'Summit': 2,
  'Eating at Top': 3,
  'Gondola Down': 4,
  'Recovery': 5,
  'Eating at Bottom': 6,
  'Starting Soon': 7,
  'Sleeping': 8,
  'Finished': 9,
}

export const STARTING_SOON_OPTIONS = [
  'Starting Now',
  'Starting Within 10 Minutes',
  'Starting Within 30 Minutes',
]

export const ATHLETE_NAMES = [
  'Taryn',
  'Eve',
  'Jessica',
  'Liz',
  'Andrea',
  'Gretta',
  'Heather',
  'Rebecca',
  'Samantha',
  'Vivian',
]

export const TOTAL_ASCENTS = 8

// Unique color per athlete (hex) — used for avatar circles
export const ATHLETE_COLORS = {
  'Taryn':    '#7A2A3A', // deep wine
  'Eve':      '#2E6B50', // deep emerald
  'Jessica':  '#8C3A58', // deep rose
  'Liz':      '#9A6020', // deep amber
  'Andrea':   '#2E4E72', // deep navy
  'Gretta':   '#5C3A78', // deep plum
  'Heather':  '#386845', // deep forest
  'Rebecca':  '#B05A30', // deep terracotta
  'Samantha': '#6E4E28', // deep brown
  'Vivan':    '#8A4860', // deep berry
}

export const RECOVERY_ITEMS = [
  { key: 'water', label: 'Refilled water' },
  { key: 'electrolytes', label: 'Took electrolytes' },
  { key: 'fuel', label: 'Ate fuel' },
  { key: 'bathroom', label: 'Bathroom / reset' },
  { key: 'ready', label: 'Ready for next ascent' },
]

// Status display colors
export const STATUS_COLORS = {
  'Climbing': 'text-burgundy',
  'Summit': 'text-success',
  'Eating at Top': 'text-warning',
  'Gondola Down': 'text-warmGray',
  'Recovery': 'text-warning',
  'Eating at Bottom': 'text-warning',
  'Starting Soon': 'text-burgundy',
  'Sleeping': 'text-warmGray',
  'Finished': 'text-success',
  'Need Help': 'text-urgent',
}

// Status icons (emoji fallbacks)
export const STATUS_ICONS = {
  'Starting Soon': '🏁',
  'Climbing': '⛰️',
  'Summit': '🏔️',
  'Eating at Top': '🍫',
  'Gondola Down': '🚡',
  'Recovery': '💤',
  'Eating at Bottom': '🥗',
  'Sleeping': '😴',
  'Finished': '✅',
  'Need Help': '🆘',
}
