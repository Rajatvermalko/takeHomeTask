import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import List from '../../pages/List';
import { AppProvider } from '../../context/AppContext';
import { Photo } from '../../types';

jest.mock('../../context/AppContext', () => ({
    ...jest.requireActual('../../context/AppContext'),
    useAppContext: jest.fn()
}));

import { useAppContext } from '../../context/AppContext';

describe('List Component', () => {
    const mockDispatch = jest.fn();
    const mockUseAppContext = useAppContext as jest.Mock;

    const mockPhotos: Photo[] = [
        {
            albumId: 1,
            id: 1,
            title: 'Test Photo 1',
            url: 'https://example.com/photo1.jpg',
            thumbnailUrl: 'https://example.com/thumbnail1.jpg'
        },
        {
            albumId: 1,
            id: 2,
            title: 'Test Photo 2',
            url: 'https://example.com/photo2.jpg',
            thumbnailUrl: 'https://example.com/thumbnail2.jpg'
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();

        mockUseAppContext.mockReturnValue({
            state: {
                photos: mockPhotos,
                favorites: [],
                loading: false,
                page: 1,
                hasMore: true
            },
            dispatch: mockDispatch
        });

        (global.fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockPhotos)
        });
    });

    it('renders list title and back button', () => {
        render(
            <BrowserRouter>
                <List />
            </BrowserRouter>
        );

        expect(screen.getByText('Photo List')).toBeInTheDocument();

        const backButton = screen.getByText('Back to Dashboard');
        expect(backButton).toBeInTheDocument();
        expect(backButton.closest('a')).toHaveAttribute('href', '/');
    });

    it('displays photos from state', () => {
        render(
            <BrowserRouter>
                <List />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Photo 1')).toBeInTheDocument();
        expect(screen.getByText('Test Photo 2')).toBeInTheDocument();
        expect(screen.getAllByText(/ID:/)).toHaveLength(2);
    });

    it('shows loading indicator when loading', () => {
        mockUseAppContext.mockReturnValue({
            state: {
                photos: mockPhotos,
                favorites: [],
                loading: true,
                page: 1,
                hasMore: true
            },
            dispatch: mockDispatch
        });

        render(
            <BrowserRouter>
                <List />
            </BrowserRouter>
        );

        expect(screen.getByText('Loading more photos...')).toBeInTheDocument();
    });

    it('shows end message when no more photos', () => {
        mockUseAppContext.mockReturnValue({
            state: {
                photos: mockPhotos,
                favorites: [],
                loading: false,
                page: 1,
                hasMore: false
            },
            dispatch: mockDispatch
        });

        render(
            <BrowserRouter>
                <List />
            </BrowserRouter>
        );

        expect(screen.getByText('No more photos to load')).toBeInTheDocument();
    });

    it('fetches photos on mount', async () => {
        render(
            <BrowserRouter>
                <List />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_PHOTOS_START' });
            expect(global.fetch).toHaveBeenCalledWith(
                'https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=10'
            );
        });
    });
});