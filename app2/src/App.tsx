import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';

const App: React.FC = () => {
    return (
        <div className="app2">
            <div className="placeholder">
                <h2>This is App 2</h2>
                <p>
                    This is a simple placeholder for the second micro-frontend application.
                    You can extend this application with additional features as needed.
                </p>
            </div>
        </div>
    );
};

// For standalone mode
const StandaloneApp: React.FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default App;