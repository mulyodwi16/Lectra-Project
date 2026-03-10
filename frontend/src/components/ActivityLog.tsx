import React from 'react'
import './ActivityLog.css'

interface LogEntry {
    id: number
    action: string
    classroom: string
    time: string
    status: 'triggered' | 'normal' | 'alert'
}

export const ActivityLog: React.FC = () => {
    const logs: LogEntry[] = [
        { id: 1, action: 'Auto Shutdown Triggered', classroom: 'Class A3', time: '17:05', status: 'triggered' },
        { id: 2, action: 'Auto Shutdown Triggered', classroom: 'Class A3', time: '17:03', status: 'triggered' },
        { id: 3, action: 'Auto Shutdown Triggered', classroom: 'Class A2', time: '17:25', status: 'triggered' },
        { id: 4, action: 'Auto Shutdown Triggered', classroom: 'Class A2', time: '17:25', status: 'triggered' },
        { id: 5, action: 'Auto Shutdown Triggered', classroom: 'Class A1', time: '17:25', status: 'triggered' },
        { id: 6, action: 'Auto Shutdown Triggered', classroom: 'Class B2', time: '17:25', status: 'triggered' },
        { id: 7, action: 'Auto Shutdown Triggered', classroom: 'Class B2', time: '17:25', status: 'triggered' },
    ]

    return (
        <div className="activity-log">
            <h2>Real-time Activity Log</h2>
            <div className="log-items">
                {logs.map(log => (
                    <div key={log.id} className={`log-entry ${log.status}`}>
                        <div className="log-status">
                            {log.status === 'triggered' && '⚠️'}
                            {log.status === 'normal' && '✓'}
                            {log.status === 'alert' && '🔴'}
                        </div>
                        <div className="log-content">
                            <div className="log-action">{log.action}</div>
                            <div className="log-classroom">{log.classroom}</div>
                        </div>
                        <div className="log-time">{log.time}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
