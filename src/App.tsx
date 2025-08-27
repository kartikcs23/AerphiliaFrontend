import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RegistrationProgressProvider } from './context/RegistrationProgressContext';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import FooterComponent from './components/FooterComponent/FooterComponent';
import HomePage from './pages/HomePage/HomePage';
import ComingSoonPage from './pages/ComingSoonPage/ComingSoonPage';
import BackgroundEffects from './components/BackgroundEffects/BackgroundEffects';
import CursorEffects from './components/CursorEffects/CursorEffects';
import Loader from './components/Loader/Loader';
import ScrollToTop from './hooks/useScrollToTop';
import { useState, useEffect } from 'react';

import EventsPage from './pages/EventsPage/EventsPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
// import ContactPage from './pages/ContactPage/ContactPage';
// import AboutPage from './pages/AboutPage/AboutPage';
// import ProfilePage from './pages/ProfilePage/ProfilePage';
import TeamMakingPage from './pages/TeamMakingPage/TeamMakingPage';
// import LoginPage from './pages/LoginPage/LoginPage';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with real loading logic if needed)
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <RegistrationProgressProvider>
        <Router>
          {/* Auto scroll to top on route change with smooth animation */}
          <ScrollToTop behavior="smooth" />
          <div className="min-h-screen min-w-screen w-full bg-black text-white relative">
            <BackgroundEffects intensity="high" />
            <CursorEffects enabled={true} />
            {loading ? (
              <Loader onComplete={() => setLoading(false)} />
            ) : (
              <>
                {/* Navigation */}
                <NavbarComponent />
                {/* Main Content */}
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/coming-soon" element={<ComingSoonPage />} />
                    {/* Redirect all other routes to coming-soon */}
                    <Route path="/events" element={<EventsPage/>} />
                    <Route path="/events/:eventId" element={<Navigate to="/coming-soon" replace />} />
                    <Route path="/register/:eventId" element={<RegistrationPage />} />
                    <Route path="/about" element={<Navigate to="/coming-soon" replace />} />
                    <Route path="/contact" element={<Navigate to="/coming-soon" replace />} />
                    <Route path="/profile/:id" element={<Navigate to="/coming-soon" replace />} />
                    <Route path="/team-making/:eventId" element={<TeamMakingPage />} />
                    <Route path="/login" element={<Navigate to="/coming-soon" replace />} />
                    <Route path="/signup" element={<Navigate to="/coming-soon" replace />} />
                    {/* Catch all other routes */}
                    <Route path="*" element={<Navigate to="/coming-soon" replace />} />
                  </Routes>
                </main>
                {/* Footer */}
                <FooterComponent />
              </>
            )}
          </div>
        </Router>
      </RegistrationProgressProvider>
    </AuthProvider>
  );
}

export default App;
