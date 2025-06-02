import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import List from './pages/List';
import './styles/App.scss';

const App: React.FC = () => {
    return (
        <AppProvider>
            <div className="app1">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/list" element={<List />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </AppProvider>
    );
};

// StandaloneApp is used when the app is run independently
const StandaloneApp: React.FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

// Check if we're running in standalone mode or as a micro-frontend
const isStandalone = !window.location.pathname.includes('/app1');

// Export the appropriate component based on the context
export default isStandalone ? StandaloneApp : App;