import React from 'react'
import {
    LogoIcon,
    DashboardIcon,
    ClassroomIcon,
    EnergyIcon,
    AutomationIcon,
    LogbookIcon,
    SettingsIcon
} from './Icons'
import './Sidebar.css'

interface SidebarProps {
    activeMenu: string
    onMenuChange: (menu: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuChange }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
        { id: 'classrooms', label: 'Classrooms', Icon: ClassroomIcon },
        { id: 'energy', label: 'Energy Monitoring', Icon: EnergyIcon },
        { id: 'automation', label: 'Automation', Icon: AutomationIcon },
        { id: 'logbook', label: 'Logbook', Icon: LogbookIcon },
        { id: 'settings', label: 'Settings', Icon: SettingsIcon }
    ]

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <LogoIcon size={24} color="#d6ff3f" />
                    <span className="logo-text">LECTRA</span>
                </div>
                <span className="logo-subtext">Lecture & Smart Control</span>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
                        onClick={() => onMenuChange(item.id)}
                    >
                        <span className="nav-icon">
                            <item.Icon size={18} color="inherit" />
                        </span>
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    )
}
