# Micro-Frontend Demo

This project demonstrates a micro-frontend architecture using React, TypeScript, and Webpack Module Federation.

## Project Structure

- **host**: Main application shell with Header, Footer, and SideMenu
- **app1**: Photo gallery application with favorites functionality
- **app2**: Simple placeholder application

## Features

### Host Application
- Header, Footer, and SideMenu components
- Routing to load micro-frontends
- Shared styling

### App1
- Dashboard page with favorites list
- List page with infinite scrolling photo gallery
- Add/remove photos to favorites
- State persistence between navigation

### App2
- Simple placeholder application

## Technologies Used

- React 18
- TypeScript
- React Router v6
- SCSS for styling (with modern Sass API)
- Webpack Module Federation
- Jest and React Testing Library for tests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies for all applications
npm install

# Start all applications
npm start
```

The applications will be available at:
- Host: http://localhost:3000
- App1 (standalone): http://localhost:3001
- App2 (standalone): http://localhost:3002

## Running Tests

```bash
# Run tests for all applications
npm test

# Run tests for a specific application
npm run test:host
npm run test:app1
npm run test:app2
```

## Architecture

This project uses Webpack Module Federation to implement micro-frontends. The host application serves as a shell that dynamically loads the remote applications (App1 and App2) at runtime.

Each application can be developed and deployed independently, but they share common dependencies like React and React Router to avoid duplication.

## Notes

- The Sass loader is configured to use the modern API to avoid deprecation warnings. This is done through the `sass-loader.config.js` file in each application.