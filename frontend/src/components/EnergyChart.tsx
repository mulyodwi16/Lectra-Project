import React from 'react'
import './EnergyChart.css'

export const EnergyChart: React.FC = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const data = [45, 52, 48, 61, 55, 67, 72]
    const maxValue = Math.max(...data)

    return (
        <div className="energy-chart">
            <div className="chart-header">
                <h2>Daily Energy Consumption</h2>
                <span className="chart-period">Biweekly</span>
            </div>

            <div className="chart-container">
                <svg viewBox="0 0 400 250" className="chart-svg">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map(y => (
                        <line
                            key={`grid-${y}`}
                            x1="50"
                            y1={200 - (y / 100) * 150}
                            x2="380"
                            y2={200 - (y / 100) * 150}
                            stroke="rgba(214, 255, 63, 0.05)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Area under curve */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(214, 255, 63, 0.3)" />
                            <stop offset="100%" stopColor="rgba(214, 255, 63, 0)" />
                        </linearGradient>
                    </defs>

                    {/* Path */}
                    <polyline
                        points={data.map((d, i) => `${50 + (i * 47)},${200 - (d / maxValue) * 150}`).join(' ')}
                        fill="none"
                        stroke="#d6ff3f"
                        strokeWidth="2"
                    />

                    {/* Filled area */}
                    <polygon
                        points={`50,200 ${data.map((d, i) => `${50 + (i * 47)},${200 - (d / maxValue) * 150}`).join(' ')} 380,200`}
                        fill="url(#areaGradient)"
                    />

                    {/* Data points */}
                    {data.map((d, i) => (
                        <circle
                            key={`point-${i}`}
                            cx={50 + (i * 47)}
                            cy={200 - (d / maxValue) * 150}
                            r="3"
                            fill="#d6ff3f"
                        />
                    ))}

                    {/* X-axis labels */}
                    {days.map((day, i) => (
                        <text
                            key={`label-${i}`}
                            x={50 + (i * 47)}
                            y="225"
                            textAnchor="middle"
                            fontSize="11"
                            fill="#999"
                        >
                            {day}
                        </text>
                    ))}
                </svg>
            </div>

            <div className="chart-stats">
                <div className="stat">
                    <span className="label">Avg</span>
                    <span className="value">{(data.reduce((a, b) => a + b) / data.length).toFixed(1)} kWh</span>
                </div>
                <div className="stat">
                    <span className="label">Peak</span>
                    <span className="value">{maxValue} kWh</span>
                </div>
                <div className="stat">
                    <span className="label">Total</span>
                    <span className="value">{data.reduce((a, b) => a + b)} kWh</span>
                </div>
            </div>
        </div>
    )
}
