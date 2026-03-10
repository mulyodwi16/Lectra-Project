import React from 'react'
import { Dashboard } from './components/Dashboard'
import './App.css'

function App() {
    const DEVICE_ID = import.meta.env.VITE_DEVICE_ID || 'eb4d3c6ac2d0b102fct3tt'

    return (
        <div className="app">
            <Dashboard deviceId={DEVICE_ID} />
        </div>
    )
}

export default App
