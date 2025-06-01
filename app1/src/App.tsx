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
                    {/* Redirect any other paths to the dashboard */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </AppProvider>
    );
};

const StandaloneApp: React.FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default App;