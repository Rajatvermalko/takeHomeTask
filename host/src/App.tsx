import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SideMenu from './components/SideMenu';
import './styles/App.scss';

const App1 = lazy(() => import('app1/App').catch(() => {
    console.warn('App1 is not available. Make sure it is running on port 3001.');
    return { default: () => <div className="error-message">App1 is not available. Please start it with npm run start:app1</div> };
}));

const App2 = lazy(() => import('app2/App').catch(() => {
    console.warn('App2 is not available. Make sure it is running on port 3002.');
    return { default: () => <div className="error-message">App2 is not available. Please start it with npm run start:app2</div> };
}));

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <div className="main-content">
                    <SideMenu />
                    <main className="content-area">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/app1" replace />} />
                                <Route path="/app1/*" element={<App1 />} />
                                <Route path="/app2/*" element={<App2 />} />
                                <Route path="*" element={<Navigate to="/app1" replace />} />
                            </Routes>
                        </Suspense>
                    </main>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;