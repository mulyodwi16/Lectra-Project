import React from 'react'
import { DeviceStatus } from '../services/tuyaService'
import './FloorPlan.css'

interface FloorPlanProps {
    status: DeviceStatus[]
}

export const FloorPlan: React.FC<FloorPlanProps> = ({ status }) => {
    const classRooms = [
        { id: 1, code: 'Class A3', devices: 3 },
        { id: 2, code: 'Class A2', devices: 2 },
        { id: 3, code: 'Class B2', devices: 4 },
        { id: 4, code: 'Class B1', devices: 2 },
    ]

    return (
        <div className="floor-plan">
            <h2>Interactive Floor Plan</h2>
            <div className="floor-plan-grid">
                {classRooms.map(room => {
                    const isActive = Math.random() > 0.3 // Mock active status
                    const hasAnomalies = Math.random() > 0.7 // Mock anomalies

                    return (
                        <div
                            key={room.id}
                            className={`classroom ${isActive ? 'active' : ''} ${hasAnomalies ? 'anomaly' : ''}`}
                        >
                            <div className="room-label">
                                {isActive ? '🟢' : '⚫'} {room.code}
                            </div>
                            <div className="room-status">
                                {isActive ? 'Active' : 'Off'}
                            </div>
                            <div className="room-devices">
                                {room.devices} devices
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="floor-plan-legend">
                <div className="legend-item">
                    <span className="legend-dot active"></span> Active
                </div>
                <div className="legend-item">
                    <span className="legend-dot off"></span> Off
                </div>
                <div className="legend-item">
                    <span className="legend-dot anomaly"></span> Anomaly
                </div>
            </div>
        </div>
    )
}
