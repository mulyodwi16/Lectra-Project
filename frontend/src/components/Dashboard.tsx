import React, { useState, useEffect } from 'react'
import { StatCard } from './StatCard'
import { FloorPlan } from './FloorPlan'
import { EnergyChart } from './EnergyChart'
import { ActivityLog } from './ActivityLog'
import { tuyaService, DeviceStatus } from '../services/tuyaService'
import './Dashboard.css'

interface DashboardProps {
    deviceId: string
}

export const Dashboard: React.FC<DashboardProps> = ({ deviceId }) => {
    const [status, setStatus] = useState<DeviceStatus[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

    const fetchStatus = async () => {
        try {
            setLoading(true)
            const response = await tuyaService.getDeviceStatus(deviceId)
            setStatus(response.data || [])
            setLastUpdate(new Date())
            setError(null)
        } catch (err: any) {
            setError(err.message || 'Failed to fetch device status')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStatus()
        const interval = setInterval(fetchStatus, 5000) // Refresh every 5s
        return () => clearInterval(interval)
    }, [deviceId])

    const activeDevices = status.filter(s => s.value === true).length
    const totalDevices = status.length
    const energyUsage = (Math.random() * 100).toFixed(2)
    const activeClassrooms = 2
    const devicesOnLate = 3

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>LECTRA Dashboard</h1>
                    <p className="tagline">Lecture Equipment Control & Technology Automation</p>
                </div>
                <div className="status-indicator">
                    <span className="dot"></span>
                    Connected
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Top Stats Row */}
                <div className="stats-row">
                    <StatCard
                        title="Total Active Devices"
                        value={totalDevices}
                        iconType="device"
                        trend="+2 today"
                    />
                    <StatCard
                        title="Current Energy Usage (kWh)"
                        value={energyUsage}
                        iconType="energy"
                        trend="↑ 5% vs yesterday"
                    />
                    <StatCard
                        title="Active Classrooms"
                        value={activeClassrooms}
                        iconType="classroom"
                        trend="Operating normally"
                    />
                    <StatCard
                        title="Devices ON after 17:00"
                        value={devicesOnLate}
                        iconType="alert"
                        trend="Unusual activity"
                    />
                </div>

                {/* Interactive Floor Plan */}
                <FloorPlan status={status} />

                {/* Energy Chart */}
                <EnergyChart />

                {/* Activity Log */}
                <ActivityLog />

                {error && (
                    <div className="error-banner">
                        ⚠️ {error}
                    </div>
                )}
            </div>
        </div>
    )
}
