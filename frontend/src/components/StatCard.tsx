import React from 'react'
import { DeviceIcon, EnergyIcon, ClassroomIcon } from './Icons'
import './StatCard.css'

interface StatCardProps {
    title: string
    value: string | number
    iconType?: 'device' | 'energy' | 'classroom' | 'alert'
    trend: string
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, iconType = 'device', trend }) => {
    const getIcon = () => {
        switch (iconType) {
            case 'energy':
                return <EnergyIcon size={24} color="#d6ff3f" />
            case 'classroom':
                return <ClassroomIcon size={24} color="#d6ff3f" />
            case 'alert':
                return <span className="alert-icon">⚠️</span>
            default:
                return <DeviceIcon size={24} color="#d6ff3f" />
        }
    }

    return (
        <div className="stat-card">
            <div className="stat-header">
                <span className="stat-icon">{getIcon()}</span>
                <h3>{title}</h3>
            </div>
            <div className="stat-value">{value}</div>
            <div className="stat-trend">{trend}</div>
        </div>
    )
}
