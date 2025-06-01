import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Photo } from '../types';
import PhotoItem from '../components/PhotoItem';
import '../styles/List.scss';

const List: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const { photos, loading, page, hasMore } = state;

    const observer = useRef<IntersectionObserver | null>(null);
    const lastPhotoElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch({ type: 'INCREMENT_PAGE' });
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore, dispatch]);

    const fetchPhotos = useCallback(async () => {
        try {
            dispatch({ type: 'FETCH_PHOTOS_START' });
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
            );
            const data: Photo[] = await response.json();

            dispatch({ type: 'FETCH_PHOTOS_SUCCESS', payload: data });

            if (data.length < 10) {
                dispatch({ type: 'SET_HAS_MORE', payload: false });
            }
        } catch (error) {
            console.error('Error fetching photos:', error);
            dispatch({ type: 'FETCH_PHOTOS_ERROR' });
        }
    }, [page, dispatch]);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos, page]);

    const toggleFavorite = (photo: Photo) => {
        const isFavorite = state.favorites.some(fav => fav.id === photo.id);

        if (isFavorite) {
            dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: photo.id });
        } else {
            dispatch({ type: 'ADD_TO_FAVORITES', payload: photo });
        }
    };

    return (
        <div className="list-page">
            <div className="list-header">
                <Link to="/" className="back-button">
                    Back to Dashboard
                </Link>
                <h2>Photo List</h2>
            </div>

            <div className="photos-grid">
                {photos.map((photo, index) => {
                    const isFavorite = state.favorites.some(fav => fav.id === photo.id);

                    if (photos.length === index + 1) {
                        return (
                            <div ref={lastPhotoElementRef} key={photo.id} className="photo-container">
                                <PhotoItem
                                    photo={photo}
                                    isFavorite={isFavorite}
                                    onToggleFavorite={toggleFavorite}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div key={photo.id} className="photo-container">
                                <PhotoItem
                                    photo={photo}
                                    isFavorite={isFavorite}
                                    onToggleFavorite={toggleFavorite}
                                />
                            </div>
                        );
                    }
                })}
            </div>

            {loading && <div className="loading">Loading more photos...</div>}
            {!hasMore && photos.length > 0 && (
                <div className="end-message">No more photos to load</div>
            )}
        </div>
    );
};

export default List;