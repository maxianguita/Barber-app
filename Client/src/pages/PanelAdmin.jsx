import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'react-feather'; // Importa el icono LogOut

import CrearUsuarioModal from './CrearUsuarioModall';
import VerUsuariosModal from './VerUsuariosModal';
import TurnosModal from './TurnosModal';
import GestionarProfesionalesModal from './ProfesionalesModal';

const PanelAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalUsuarios, setMostrarModalUsuarios] = useState(false);
  const [mostrarTurnosModal, setMostrarTurnosModal] = useState(false);
  const [mostrarGestionProfesionalesModal, setMostrarGestionProfesionalesModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const acciones = [
    {
      titulo: 'Crear nuevo usuario',
      descripcion: 'Agregá administradores o empleados al sistema.',
      icono: '👤',
      onClick: () => setMostrarModal(true),
    },
    {
      titulo: 'Ver usuarios registrados',
      descripcion: 'Lista de todas las cuentas creadas.',
      icono: '📋',
      onClick: () => setMostrarModalUsuarios(true),
    },
    {
      titulo: 'Gestionar profesionales',
      descripcion: 'Agregar, editar o eliminar barberos.',
      icono: '✂️',
      onClick: () => setMostrarGestionProfesionalesModal(true),
    },
    {
      titulo: 'Turnos',
      descripcion: 'Crear y administrar reservas.',
      icono: '📅',
      onClick: () => setMostrarTurnosModal(true),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-black flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-full sm:max-w-4xl md:max-w-5xl bg-black/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-10 text-white relative">

        <button
          onClick={() => navigate('/')}
          className="absolute left-4 top-4 sm:left-6 sm:top-6 text-white hover:text-red-700 transition text-xl sm:text-2xl"
        >
          ← Home
        </button>

        <header className="mb-6 sm:mb-8 border-b border-gray-600 pb-3 sm:pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-red-700">Panel de Administración</h1>
          <p className="mt-1 text-gray-300 font-semibold text-center text-sm sm:text-base">Gestión interna de la barbería</p>
        </header>

        {user ? (
          <>
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-lg sm:text-xl font-bold">
                Bienvenido, <span className="text-sky-400 font-bold">{user.name}</span> 👋
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {acciones.map((accion, index) => (
                <div
                  key={index}
                  onClick={accion.onClick}
                  className="cursor-pointer bg-gray-700 hover:bg-sky-700 transition-all duration-200 p-5 sm:p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
                >
                  <div className="text-4xl mb-3">{accion.icono}</div>
                  <h2 className="text-lg sm:text-xl font-bold mb-2">{accion.titulo}</h2>
                  <p className="text-gray-300 text-sm sm:text-base">{accion.descripcion}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-300 font-semibold">Cargando información del usuario...</p>
          </div>
        )}

        {/* Botón nuevo con icono y estilos */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="inline-flex items-center gap-2 px-7 py-5  hover:opacity-90 text-white-700 text-lg font-semibold transition-all duration-300 hover:text-red-700"
          >
            <LogOut size={20} /> Cerrar sesión
          </button>
        </div>
      </div>

      {mostrarModal && <CrearUsuarioModal onClose={() => setMostrarModal(false)} />}
      {mostrarModalUsuarios && <VerUsuariosModal onClose={() => setMostrarModalUsuarios(false)} />}
      {mostrarTurnosModal && <TurnosModal onClose={() => setMostrarTurnosModal(false)} />}
      {mostrarGestionProfesionalesModal && <GestionarProfesionalesModal onClose={() => setMostrarGestionProfesionalesModal(false)} />}
    </div>
  );
};

export default PanelAdmin;
