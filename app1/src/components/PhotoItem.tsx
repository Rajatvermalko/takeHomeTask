import React from 'react';
import { Photo } from '../types';
import '../styles/PhotoItem.scss';

interface PhotoItemProps {
    photo: Photo;
    isFavorite: boolean;
    onToggleFavorite: (photo: Photo) => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, isFavorite, onToggleFavorite }) => {
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(photo);
    };

    return (
        <div className="photo-item">
            <div className="photo-header">
                <span className="photo-id">ID: {photo.id}</span>
                <button
                    className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>
            <img src={photo.thumbnailUrl} alt={photo.title} className="photo-image" />
            <h3 className="photo-title">{photo.title}</h3>
        </div>
    );
};

export default PhotoItem;