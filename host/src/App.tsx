import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SideMenu from './components/SideMenu';
import './styles/App.scss';

// Lazy load the remote applications
const App1 = lazy(() => import('app1/App'));
const App2 = lazy(() => import('app2/App'));

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