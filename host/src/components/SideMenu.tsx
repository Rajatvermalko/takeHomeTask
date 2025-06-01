import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/SideMenu.scss';

const SideMenu: React.FC = () => {
    const location = useLocation();

    // Check if the current path is related to App 1 (starts with "/app1")
    const isApp1Active = location.pathname === '/' || location.pathname === '/app1' || location.pathname.startsWith('/app1/');

    return (
        <nav className="side-menu">
            <ul>
                <li>
                    <NavLink
                        to="/app1"
                        className={isApp1Active ? 'active' : ''}
                    >
                        App 1
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/app2" className={({ isActive }) => isActive ? 'active' : ''}>
                        App 2
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default SideMenu;