import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../styles/Dashboard.scss';

const Dashboard: React.FC = () => {
    const { state } = useAppContext();
    const { favorites } = state;

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>

            <div className="dashboard-actions">
                <Link to="list" className="list-button">
                    Go to List
                </Link>
            </div>

            <div className="favorites-section">
                <h3>Favorites ({favorites.length})</h3>
                {favorites.length === 0 ? (
                    <p className="no-favorites">No favorites added yet.</p>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map(photo => (
                            <div key={photo.id} className="favorite-item">
                                <img src={photo.thumbnailUrl} alt={photo.title} />
                                <div className="favorite-details">
                                    <span className="favorite-id">ID: {photo.id}</span>
                                    <h4 className="favorite-title">{photo.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;