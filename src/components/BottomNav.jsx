const TABS = [
  { id: 'team', label: 'Team', icon: TeamIcon },
  { id: 'me', label: 'Me', icon: MeIcon },
  { id: 'status', label: 'Status', icon: StatusIcon },
  { id: 'recovery', label: 'Recovery', icon: RecoveryIcon },
  { id: 'family', label: 'Family', icon: FamilyIcon },
]

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-cardBg border-t border-border z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] gap-0.5 transition-colors"
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon active={isActive} />
              <span
                className={`text-[11px] ${isActive ? 'text-burgundy font-bold' : 'text-warmGray font-normal'}`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function TeamIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="3" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" />
      <circle cx="17" cy="9" r="2.5" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" />
      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 14c1.7 0 3 1.3 3 3v2" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function MeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function StatusIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <polygon points="12,3 22,21 2,21" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" strokeLinejoin="round" fill={active ? '#7A1E2C' : 'none'} />
    </svg>
  )
}

function RecoveryIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M9 11l3 3L22 4" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FamilyIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={active ? '#7A1E2C' : '#7C746B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={active ? '#7A1E2C' : 'none'} />
    </svg>
  )
}
