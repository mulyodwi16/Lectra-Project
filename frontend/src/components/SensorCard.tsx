import React from 'react'
import './SensorCard.css'

interface SensorCardProps {
    code: string
    name: string
    value: any
    type: string
    onToggle?: (value: any) => void
}

export const SensorCard: React.FC<SensorCardProps> = ({ code, name, value, type, onToggle }) => {
    const formatValue = (val: any, typeStr: string): string => {
        if (typeStr === 'Boolean') {
            return val ? 'ON' : 'OFF'
        }
        if (typeStr === 'Integer') {
            return `${val}s`
        }
        return String(val)
    }

    const getStatusColor = (val: any, typeStr: string): string => {
        if (typeStr === 'Boolean') {
            return val ? '#d6ff3f' : '#666'
        }
        return '#d6ff3f'
    }

    return (
        <div className="sensor-card">
            <div className="sensor-header">
                <h3 className="sensor-name">{name}</h3>
                <span className="sensor-code">{code}</span>
            </div>

            <div className="sensor-value" style={{ color: getStatusColor(value, type) }}>
                {formatValue(value, type)}
            </div>

            <div className="sensor-type">{type}</div>

            {(type === 'Boolean' && onToggle) && (
                <button
                    className="sensor-button"
                    onClick={() => onToggle(!value)}
                >
                    Toggle
                </button>
            )}
        </div>
    )
}
