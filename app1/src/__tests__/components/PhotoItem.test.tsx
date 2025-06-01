import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PhotoItem from '../../components/PhotoItem';
import { Photo } from '../../types';

describe('PhotoItem Component', () => {
    const mockPhoto: Photo = {
        albumId: 1,
        id: 1,
        title: 'Test Photo',
        url: 'https://example.com/photo.jpg',
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
    };

    const mockToggleFavorite = jest.fn();

    it('renders photo details correctly', () => {
        render(
            <PhotoItem
                photo={mockPhoto}
                isFavorite={false}
                onToggleFavorite={mockToggleFavorite}
            />
        );

        expect(screen.getByText('ID: 1')).toBeInTheDocument();
        expect(screen.getByText('Test Photo')).toBeInTheDocument();
        expect(screen.getByAltText('Test Photo')).toHaveAttribute('src', 'https://example.com/thumbnail.jpg');
    });

    it('displays empty star when not favorite', () => {
        render(
            <PhotoItem
                photo={mockPhoto}
                isFavorite={false}
                onToggleFavorite={mockToggleFavorite}
            />
        );

        expect(screen.getByText('☆')).toBeInTheDocument();
    });

    it('displays filled star when favorite', () => {
        render(
            <PhotoItem
                photo={mockPhoto}
                isFavorite={true}
                onToggleFavorite={mockToggleFavorite}
            />
        );

        expect(screen.getByText('★')).toBeInTheDocument();
    });

    it('calls toggle favorite function when button is clicked', () => {
        render(
            <PhotoItem
                photo={mockPhoto}
                isFavorite={false}
                onToggleFavorite={mockToggleFavorite}
            />
        );

        fireEvent.click(screen.getByText('☆'));
        expect(mockToggleFavorite).toHaveBeenCalledWith(mockPhoto);
    });
});