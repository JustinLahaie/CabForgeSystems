import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import LoginPage from './pages/LoginPage'
import ClientsScreen from './ClientsScreen'
import RoomsScreen from './RoomsScreen'
import RoomDesignScreen from './RoomDesignScreen'
import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* App Routes */}
            <Route path="/clients" element={<ClientsScreen />} />
            <Route path="/client/:clientId/rooms" element={<RoomsScreen />} />
            <Route path="/client/:clientId/room/:roomId" element={<RoomDesignScreen />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
