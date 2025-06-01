import React from 'react';
import { render, act } from '@testing-library/react';
import { AppProvider, useAppContext } from '../../context/AppContext';
import { Photo } from '../../types';

const TestComponent: React.FC = () => {
    const { state, dispatch } = useAppContext();

    return (
        <div>
            <div data-testid="photos-count">{state.photos.length}</div>
            <div data-testid="favorites-count">{state.favorites.length}</div>
            <div data-testid="loading">{state.loading.toString()}</div>
            <div data-testid="page">{state.page}</div>
            <div data-testid="has-more">{state.hasMore.toString()}</div>
            <button
                data-testid="fetch-start-btn"
                onClick={() => dispatch({ type: 'FETCH_PHOTOS_START' })}
            >
                Fetch Start
            </button>
            <button
                data-testid="add-photos-btn"
                onClick={() => {
                    const photos: Photo[] = [
                        {
                            albumId: 1,
                            id: 1,
                            title: 'Test Photo',
                            url: 'https://example.com/photo.jpg',
                            thumbnailUrl: 'https://example.com/thumbnail.jpg'
                        }
                    ];
                    dispatch({ type: 'FETCH_PHOTOS_SUCCESS', payload: photos });
                }}
            >
                Add Photos
            </button>
            <button
                data-testid="add-favorite-btn"
                onClick={() => {
                    const photo: Photo = {
                        albumId: 1,
                        id: 2,
                        title: 'Favorite Photo',
                        url: 'https://example.com/photo2.jpg',
                        thumbnailUrl: 'https://example.com/thumbnail2.jpg'
                    };
                    dispatch({ type: 'ADD_TO_FAVORITES', payload: photo });
                }}
            >
                Add Favorite
            </button>
            <button
                data-testid="remove-favorite-btn"
                onClick={() => dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: 2 })}
            >
                Remove Favorite
            </button>
            <button
                data-testid="increment-page-btn"
                onClick={() => dispatch({ type: 'INCREMENT_PAGE' })}
            >
                Increment Page
            </button>
            <button
                data-testid="set-has-more-btn"
                onClick={() => dispatch({ type: 'SET_HAS_MORE', payload: false })}
            >
                Set Has More
            </button>
        </div>
    );
};

describe('AppContext', () => {
    it('provides initial state', () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        expect(getByTestId('photos-count').textContent).toBe('0');
        expect(getByTestId('favorites-count').textContent).toBe('0');
        expect(getByTestId('loading').textContent).toBe('false');
        expect(getByTestId('page').textContent).toBe('1');
        expect(getByTestId('has-more').textContent).toBe('true');
    });

    it('updates loading state', () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        act(() => {
            getByTestId('fetch-start-btn').click();
        });

        expect(getByTestId('loading').textContent).toBe('true');
    });

    it('adds photos to state', () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        act(() => {
            getByTestId('add-photos-btn').click();
        });

        expect(getByTestId('photos-count').textContent).toBe('1');
    });

    it('adds and removes favorites', () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        act(() => {
            getByTestId('add-favorite-btn').click();
        });

        expect(getByTestId('favorites-count').textContent).toBe('1');

        act(() => {
            getByTestId('remove-favorite-btn').click();
        });

        expect(getByTestId('favorites-count').textContent).toBe('0');
    });

    it('increments page number', () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        act(() => {
            getByTestId('increment-page-btn').click();
        });

        expect(getByTestId('page').textContent).toBe('2');
    });

    it('updates hasMore flag', () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        act(() => {
            getByTestId('set-has-more-btn').click();
        });

        expect(getByTestId('has-more').textContent).toBe('false');
    });
});