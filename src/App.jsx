import { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Toast from './components/Toast'
import TeamBoard from './screens/TeamBoard'
import MyDashboard from './screens/MyDashboard'
import UpdateStatus from './screens/UpdateStatus'
import UpdateAscents from './screens/UpdateAscents'
import RecoveryChecklist from './screens/RecoveryChecklist'
import AthleteDetail from './screens/AthleteDetail'
import FamilyView from './screens/FamilyView'
import SelectAthlete from './screens/SelectAthlete'
import { useAthletes } from './hooks/useAthletes'
import { useCurrentAthlete } from './hooks/useCurrentAthlete'

// Standalone wrapper — fetches its own data for the /family URL
function FamilyStandalone() {
  const { athletes, loading, error } = useAthletes()
  return <FamilyView athletes={athletes} loading={loading} error={error} />
}

export default function App() {
  const location = useLocation()

  // Family view is standalone — no nav, no auth
  if (location.pathname === '/family') {
    return <FamilyStandalone />
  }

  return <MainApp />
}

function MainApp() {
  const [activeTab, setActiveTab] = useState('team')
  // screen: null (show tab) | 'athlete-detail' | 'update-status' | 'update-ascents' | 'recovery-screen'
  const [screen, setScreen] = useState(null)
  const [selectedAthleteId, setSelectedAthleteId] = useState(null)
  const [toast, setToast] = useState(null)

  const { athletes, loading, error } = useAthletes()
  const { currentAthleteId, setCurrentAthleteId } = useCurrentAthlete()

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  // Navigate to a named sub-screen (optionally with an athlete ID)
  const pushScreen = useCallback((screenName, athleteId = null) => {
    setScreen(screenName)
    if (athleteId) setSelectedAthleteId(athleteId)
  }, [])

  // Go back to the current tab
  const goBack = useCallback(() => {
    setScreen(null)
    setSelectedAthleteId(null)
  }, [])

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
    setScreen(null)
    setSelectedAthleteId(null)
  }, [])

  const currentAthlete = athletes.find((a) => a.id === currentAthleteId)

  // First-time setup: pick your athlete
  if (!currentAthleteId && !loading) {
    return (
      <SelectAthlete
        athletes={athletes}
        onSelect={setCurrentAthleteId}
      />
    )
  }

  const renderContent = () => {
    // ── Sub-screens (shown on top of whatever tab was active) ──
    if (screen === 'athlete-detail') {
      const athlete = athletes.find((a) => a.id === selectedAthleteId)
      return (
        <AthleteDetail
          athlete={athlete}
          currentAthlete={currentAthlete}
          onBack={goBack}
          onNavigate={pushScreen}
          showToast={showToast}
        />
      )
    }
    if (screen === 'update-status') {
      return (
        <UpdateStatus
          athlete={currentAthlete}
          onBack={goBack}
          showToast={showToast}
        />
      )
    }
    if (screen === 'update-ascents') {
      return (
        <UpdateAscents
          athlete={currentAthlete}
          onBack={goBack}
          showToast={showToast}
        />
      )
    }
    if (screen === 'recovery-screen') {
      return (
        <RecoveryChecklist
          athlete={currentAthlete}
          onBack={goBack}
          showToast={showToast}
        />
      )
    }

    // ── Tab content ──
    switch (activeTab) {
      case 'team':
        return (
          <TeamBoard
            athletes={athletes}
            loading={loading}
            onAthletePress={(id) => pushScreen('athlete-detail', id)}
          />
        )
      case 'me':
        return (
          <MyDashboard
            athlete={currentAthlete}
            loading={loading}
            onUpdateStatus={() => pushScreen('update-status')}
            onUpdateAscents={() => pushScreen('update-ascents')}
            onRecovery={() => pushScreen('recovery-screen')}
          />
        )
      case 'status':
        return (
          <UpdateStatus
            athlete={currentAthlete}
            onBack={() => handleTabChange('me')}
            showToast={showToast}
          />
        )
      case 'recovery':
        return (
          <RecoveryChecklist
            athlete={currentAthlete}
            onBack={null}
            showToast={showToast}
          />
        )
      case 'family':
        return <FamilyView athletes={athletes} loading={loading} error={error} inline />
      default:
        return null
    }
  }

  return (
    <div className="min-h-dvh bg-cream pb-20">
      {renderContent()}
      <BottomNav
        activeTab={screen ? null : activeTab}
        onTabChange={handleTabChange}
      />
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  )
}
