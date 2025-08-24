import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RegistrationProgressProvider } from './context/RegistrationProgressContext';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import FooterComponent from './components/FooterComponent/FooterComponent';
import HomePage from './pages/HomePage/HomePage';
import EventsPage from './pages/EventsPage/EventsPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import TeamMakingPage from './pages/TeamMakingPage/TeamMakingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ComingSoonPage from './pages/ComingSoonPage/ComingSoonPage';

import BackgroundEffects from './components/BackgroundEffects/BackgroundEffects';
import CursorEffects from './components/CursorEffects/CursorEffects';
import Loader from './components/Loader/Loader';
import { useState, useEffect } from 'react';

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
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/events/:eventId" element={<EventsPage />} />
                    <Route path="/register/:eventId" element={<RegistrationPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                    <Route path="/team-making/:eventId" element={<TeamMakingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<LoginPage />} />
                    <Route path="/coming-soon" element={<ComingSoonPage />} />
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
