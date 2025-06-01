import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App2 Component', () => {
    it('renders the placeholder content', () => {
        render(<App />);

        expect(screen.getByText('This is App 2')).toBeInTheDocument();
        expect(screen.getByText(/This is a simple placeholder/)).toBeInTheDocument();
    });
});