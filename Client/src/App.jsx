import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import PanelAdmin from './pages/PanelAdmin';
import Login from './componets/Login';
import Home from './componets/Home';
import Navbar from './componets/Navbar';
import BannerInfo from './pages/BannerInfo';
import Footer from './componets/Footer';
import Turnos from './pages/Turnos';
import TurnosPage from './pages/TurnosPage';
import Cursos from './pages/Cursos';
import PerfilPage from './pages/PerfilPage';
import ModalRegister from './componets/ModalRegister';
import './index.css';

// Rutas protegidas usando contexto
const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.rol === 'admin' ? children : <Navigate to="/" />;
};

const AppContent = () => {
  const location = useLocation();
  const isBasicLayout = !['/login', '/paneladmin'].includes(location.pathname);

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      {isBasicLayout && <BannerInfo />}
      {isBasicLayout && <Navbar onOpenRegister={() => setShowRegisterModal(true)} />}

      <div className="App min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turnos" element={<TurnosPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/perfilpage" element={<PerfilPage />} />

          {/* Rutas protegidas */}
          <Route
            path="/paneladmin"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <PanelAdmin />
                </AdminRoute>
              </PrivateRoute>
            }
          />

<Route
  path="/perfil"
  element={
    <PrivateRoute>
      <PerfilPage />
    </PrivateRoute>
  }
/>

          <Route
            path="/mis-turnos"
            element={
              <PrivateRoute>
                <Turnos />
              </PrivateRoute>
            }
          />
        </Routes>

        {isBasicLayout && <Footer />}
      </div>

      {showRegisterModal && (
        <ModalRegister onClose={() => setShowRegisterModal(false)} />
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
