import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import { AppProvider } from '../../context/AppContext';
import { Photo } from '../../types';

jest.mock('../../context/AppContext', () => ({
    ...jest.requireActual('../../context/AppContext'),
    useAppContext: jest.fn()
}));

import { useAppContext } from '../../context/AppContext';

describe('Dashboard Component', () => {
    const mockUseAppContext = useAppContext as jest.Mock;

    beforeEach(() => {
        mockUseAppContext.mockReturnValue({
            state: {
                favorites: []
            }
        });
    });

    it('renders dashboard title', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('displays "Go to List" button', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        const listButton = screen.getByText('Go to List');
        expect(listButton).toBeInTheDocument();
        expect(listButton.closest('a')).toHaveAttribute('href', '/list');
    });

    it('shows message when no favorites', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(screen.getByText('Favorites (0)')).toBeInTheDocument();
        expect(screen.getByText('No favorites added yet.')).toBeInTheDocument();
    });

    it('displays favorites when available', () => {
        const mockFavorites: Photo[] = [
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

        mockUseAppContext.mockReturnValue({
            state: {
                favorites: mockFavorites
            }
        });

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(screen.getByText('Favorites (2)')).toBeInTheDocument();
        expect(screen.getByText('Test Photo 1')).toBeInTheDocument();
        expect(screen.getByText('Test Photo 2')).toBeInTheDocument();
        expect(screen.getByText('ID: 1')).toBeInTheDocument();
        expect(screen.getByText('ID: 2')).toBeInTheDocument();
    });
});