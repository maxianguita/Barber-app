import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalRegister from './ModalRegister';
import ModalLogin from './ModalLogin';
import ModalPerfil from '../pages/PerfilPage';
import React from 'react';
import logo1 from '../assets/barber_files/barbershop.png';
import { useAuth } from '../context/AuthContext';
import userlogo from '../assets/barber_files/usuario.png';
import { LogOut } from 'lucide-react';
import backgroundImage from '../assets/barber_files/barberfondo7.avif'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);

  useEffect(() => {
    const shouldBlockScroll = isOpen || showLogin || showRegister || showPerfil;
    document.body.style.overflow = shouldBlockScroll ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, showLogin, showRegister, showPerfil]);

  const toggleMenu = () => {
    setIsOpen(prev => {
      const newState = !prev;
      if (newState) {
        localStorage.setItem('menuOpen', 'true');
      } else {
        localStorage.removeItem('menuOpen');
      }
      return newState;
    });
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
    localStorage.removeItem('menuOpen');
  };

  const handleLoginSuccess = () => setShowLogin(false);
  const handleLogout = () => {
    logout();
    handleCloseMenu();
  };

  return (
    <nav className="relative w-full z-50 bg-black">
      {/* Fondo de imagen en lugar del video */}
      {location.pathname === '/' && (
  <div className="absolute top-0 left-0 w-full h-screen z-10 overflow-hidden">
    {/* Imagen de fondo */}
    <img
      src={backgroundImage}
      alt="Background"
      className="w-full h-full object-cover object-center"
    />

    {/* Capa de desenfoque */}
    <div className="absolute inset-0 backdrop-blur-[4px] bg-black/30"></div>
  </div>
)}




      <div className="container mx-auto flex items-center justify-between relative z-50 p-4">
        {!isOpen && (
          <a href="/" className="flex items-center gap-2">
            <img src={logo1} alt="Barbería Deluxe Logo" className="h-24 w-24 object-contain" />
          </a>
        )}

        {/* Botón Mi cuenta (MOBILE) */}
        <div className="md:hidden z-50 ml-auto flex items-center space-x-4">
          {user && (
            <div className="ml-auto">
              <button
                onClick={() => setShowPerfil(true)}
                title="Mi cuenta"
                className="hidden sm:flex text-white text-sm flex items-center gap-2 border border-white rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
              >
                <img src={userlogo} alt="Mi cuenta" className="w-5 h-5 object-contain" />
                <span>Mi cuenta</span>
              </button>
            </div>
          )}
          <button onClick={toggleMenu} className="text-white">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navbar Desktop */}
        <div className="hidden md:flex items-center space-x-6 text-xl font-bold">
          <a href="/" className="text-white hover:text-gray-300">Home</a>
          <a href="#servicios" className="text-white hover:text-gray-300">Servicios</a>
          <button onClick={() => navigate('/cursos')} className="text-white hover:text-gray-300">Cursos</button>
          {user && (
            <div className="ml-auto">
              <button
                onClick={() => setShowPerfil(true)}
                title="Mi cuenta"
                className="text-white text-sm flex items-center gap-2 border border-white rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
              >
                <img src={userlogo} alt="Mi cuenta" className="w-5 h-5 object-contain" />
                <span>Mi cuenta</span>
              </button>
            </div>
          )}
        </div>

        {/* Login / Register (Desktop) */}
        {user ? (
          <div className="hidden md:flex items-center space-x-4 font-bold text-xl"></div>
        ) : (
          <ul className="hidden md:flex space-x-6 text-lg font-semibold">
            <li>
              <button
                onClick={() => setShowLogin(true)}
                className="text-gray-200 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowRegister(true)}
                className="text-gray-200 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Register
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Modal Login */}
      {showLogin && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-70 flex items-center justify-center" onClick={() => setShowLogin(false)}>
          <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-lg p-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <button onClick={() => setShowLogin(false)} className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900">×</button>
            <ModalLogin onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}

      {/* Modal Register */}
      {showRegister && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-70 flex items-center justify-center" onClick={() => setShowRegister(false)}>
          <div onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-300">
              <img src={logo1} alt="Logo" className="h-[60px]" />
              <button onClick={() => setShowRegister(false)} className="text-2xl font-bold text-gray-600 hover:text-gray-900">×</button>
            </div>
            <ModalRegister onClose={() => setShowRegister(false)} onRegisterSuccess={() => setShowRegister(false)} />
          </div>
        </div>
      )}

      {/* Sidebar Mobile */}
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-black text-white p-6 z-50 transition-transform transform translate-x-0 rounded-l-xl flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <img src={logo1} alt="Logo" className="h-20 object-contain" />
            <button onClick={handleCloseMenu} className="text-3xl font-bold text-white">×</button>
          </div>

          <div className="border-t border-gray-400 my-4"></div>

          {!user && (
            <div className="flex flex-col space-y-4 font-bold mt-6 text-2xl">
              <button onClick={() => { setShowLogin(true); handleCloseMenu(); }} className="hover:text-gray-300 text-right">Login</button>
              <button onClick={() => { setShowRegister(true); handleCloseMenu(); }} className="hover:text-gray-300 text-right">Register</button>
            </div>
          )}

          <div className="flex flex-col space-y-4 font-bold mt-8 text-2xl">
            <a href="/" onClick={handleCloseMenu} className="hover:text-gray-300 text-right">Home</a>
            <a href="#servicios" onClick={handleCloseMenu} className="hover:text-gray-300 text-right">Servicios</a>
            <button onClick={() => { navigate('/cursos'); handleCloseMenu(); }} className="hover:text-gray-300 text-right">Cursos</button>
          </div>

          {user && (
            <div className="flex flex-col space-y-4 font-bold mt-8 text-2xl text-right">
              <button
                onClick={() => {
                  setShowPerfil(true);
                  handleCloseMenu();
                }}
                className="inline-flex items-center gap-2 justify-end text-white hover:text-gray-300"
              >
                <img src={userlogo} alt="Mi cuenta" className="w-5 h-5 object-contain" />
                <span>Mi cuenta</span>
              </button>
            </div>
          )}

          {user && (
            <div className="mt-20 text-right">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-3 bg-white hover:bg-red-600 text-black text-lg font-semibold rounded-xl shadow-lg transition-all duration-300"
              >
                <LogOut size={20} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal Perfil */}
      {showPerfil && (
        <ModalPerfil onClose={() => setShowPerfil(false)} />
      )}
    </nav>
  );
};

export default Navbar;
