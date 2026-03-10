import React, { useState, useEffect } from 'react'
import { SensorCard } from './SensorCard'
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

    const handleSensorToggle = async (code: string, newValue: boolean) => {
        try {
            await tuyaService.executeCommand(deviceId, {
                commands: [{ code, value: newValue }]
            })

            // Update local state immediately
            setStatus(prevStatus =>
                prevStatus.map(s =>
                    s.code === code ? { ...s, value: newValue } : s
                )
            )
        } catch (err) {
            console.error('Failed to toggle sensor:', err)
        }
    }

    const getSensorName = (code: string): string => {
        const nameMap: { [key: string]: string } = {
            'switch_1': 'Switch 1',
            'switch_2': 'Switch 2',
            'countdown_1': 'Countdown 1',
            'countdown_2': 'Countdown 2',
            'relay_status': 'Relay Status',
            'switch_backlight': 'Backlight',
            'cycle_time': 'Cycle Time',
            'random_time': 'Random Time',
            'switch_inching': 'Inching',
        }
        return nameMap[code] || code
    }

    const getSensorType = (code: string): string => {
        const typeMap: { [key: string]: string } = {
            'switch_1': 'Boolean',
            'switch_2': 'Boolean',
            'countdown_1': 'Integer',
            'countdown_2': 'Integer',
            'relay_status': 'Enum',
            'switch_backlight': 'Boolean',
            'cycle_time': 'String',
            'random_time': 'String',
            'switch_inching': 'String',
        }
        return typeMap[code] || 'Unknown'
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Lectra Dashboard</h1>
                <div className="header-info">
                    <button className="refresh-btn" onClick={fetchStatus} disabled={loading}>
                        {loading ? 'Updating...' : 'Refresh'}
                    </button>
                    {lastUpdate && (
                        <span className="last-update">
                            Last update: {lastUpdate.toLocaleTimeString()}
                        </span>
                    )}
                </div>
            </div>

            {error && (
                <div className="error-banner">
                    ⚠️ {error}
                </div>
            )}

            {loading && status.length === 0 && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading device status...</p>
                </div>
            )}

            <div className="sensors-grid">
                {status.map(sensor => (
                    <SensorCard
                        key={sensor.code}
                        code={sensor.code}
                        name={getSensorName(sensor.code)}
                        value={sensor.value}
                        type={getSensorType(sensor.code)}
                        onToggle={
                            getSensorType(sensor.code) === 'Boolean'
                                ? (val) => handleSensorToggle(sensor.code, val)
                                : undefined
                        }
                    />
                ))}
            </div>

            {status.length === 0 && !loading && (
                <div className="no-data">
                    <p>No sensor data available</p>
                </div>
            )}
        </div>
    )
}
