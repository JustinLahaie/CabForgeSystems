# CabForge360

A parametric cabinet design and manufacturing software built with React and Material-UI.

## Project Structure

```
src/
├── components/
│   └── layout/
│       ├── Header.jsx
│       ├── Footer.jsx
│       └── Layout.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── FeaturesPage.jsx
│   ├── PricingPage.jsx
│   └── LoginPage.jsx
├── App.jsx
├── App.css
└── index.css
```

## Features

### Public Pages
- **Home Page** (`/`): Landing page with hero section and feature overview
- **Features Page** (`/features`): Detailed feature showcase with interactive cards
- **Pricing Page** (`/pricing`): Pricing tiers and plan comparison
- **Login/Signup** (`/login`): Authentication portal with login and signup options

### Application Pages
- **Clients Management** (`/clients`): View and manage client list
- **Rooms Management** (`/client/:clientId/rooms`): Manage rooms for each client
- **Room Design** (`/client/:clientId/room/:roomId`): 2D/3D room and cabinet design

### Core Features
1. **Parametric Design**
   - Dynamic cabinet dimensions
   - Real-time updates
   - Variable management

2. **Project Organization**
   - Client management
   - Room organization
   - Design hierarchy

3. **User Interface**
   - Material-UI components
   - Dark theme
   - Responsive design

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Access the application:
   - Local: http://localhost:5174
   - Network: http://[your-ip]:5174

## Tech Stack

- React
- React Router
- Material-UI
- Vite
