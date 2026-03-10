import React from 'react'

interface IconProps {
    size?: number
    color?: string
    className?: string
}

export const DashboardIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
)

export const ClassroomIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M2 6h20v12H2z" />
        <path d="M2 8v2m5-2v2m5-2v2m5-2v2" />
        <path d="M12 14v4" />
    </svg>
)

export const EnergyIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
)

export const AutomationIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />
        <path d="M9 11H5a4 4 0 0 0-4 4v2h4m10 0h4v-2a4 4 0 0 0-4-4h-4" />
    </svg>
)

export const LogbookIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
    </svg>
)

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6m-17.78 7.78l4.24-4.24m5.08-5.08l4.24-4.24" />
    </svg>
)

export const LogoIcon: React.FC<IconProps> = ({ size = 32, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M5 8h22v16H5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10v12m5-12v12m5-12v12m5-12v12" strokeLinecap="round" />
        <rect x="5" y="8" width="22" height="4" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
)

export const DeviceIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
    </svg>
)

export const TrendUpIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
)
