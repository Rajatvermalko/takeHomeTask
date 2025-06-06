import React from 'react';
import '../styles/Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Micro-Frontend Demo</p>
        </footer>
    );
};

export default Footer;