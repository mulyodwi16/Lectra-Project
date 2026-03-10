import React, { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { Sidebar } from './components/Sidebar'
import './App.css'

function App() {
    const DEVICE_ID = import.meta.env.VITE_DEVICE_ID || 'eb4d3c6ac2d0b102fct3tt'
    const [activeMenu, setActiveMenu] = useState('dashboard')

    return (
        <div className="app-container">
            <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
            <div className="main-content">
                {activeMenu === 'dashboard' && <Dashboard deviceId={DEVICE_ID} />}
                {activeMenu === 'classrooms' && <div className="page">Classrooms - Coming Soon</div>}
                {activeMenu === 'energy' && <div className="page">Energy Monitoring - Coming Soon</div>}
                {activeMenu === 'automation' && <div className="page">Automation - Coming Soon</div>}
                {activeMenu === 'logbook' && <div className="page">Logbook - Coming Soon</div>}
                {activeMenu === 'settings' && <div className="page">Settings - Coming Soon</div>}
            </div>
        </div>
    )
}

export default App
