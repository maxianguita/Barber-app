import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CalendarDays, Clock, Scissors, UserCircle, LogOut } from 'lucide-react';

const ModalPerfil = ({ onClose }) => {
  const [turnos, setTurnos] = useState([]);
  const { user, token, logout } = useAuth(); // agregamos logout
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTurnos = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/api/turnos/mis-turnos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error al obtener turnos');
        const ordenados = data.sort(
          (a, b) => new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`)
        );
        setTurnos(ordenados);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTurnos();
  }, [token]);

  const handleCancelarTurno = async (id) => {
    if (!window.confirm('¿Querés cancelar este turno?')) return;
    try {
      const res = await fetch(`http://localhost:3001/api/turnos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al cancelar turno');
      setTurnos((prev) => prev.filter((t) => t.id !== id));
      alert('Turno cancelado correctamente');
    } catch (error) {
      alert(error.message);
    }
  };

  const formatDate = (fechaStr) =>
    new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' }).format(new Date(fechaStr));

  const formatTime = (horaStr) => `${horaStr} hs`;

  const capitalizar = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 w-full max-w-3xl rounded-2xl shadow-2xl p-6 relative overflow-y-auto max-h-[90vh] text-white">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 text-3xl font-bold transition"
        >
          &times;
        </button>

        {/* Bienvenida */}
        <div className="text-center mt-2">
          <h2 className="text-4xl font-extrabold text-white">
            👋 Hola, <span className="text-red-700">{capitalizar(user?.nombre || user?.name)}</span>
          </h2>
          <p className="text-sm mt-1 text-zinc-300">¡Gracias por elegirnos!</p>
        </div>

        {/* Datos del usuario */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-3">🧾 Tus datos</h3>
          <div className="bg-zinc-800 rounded-xl p-4 space-y-2 shadow-md">
            <p><strong>📛 Nombre:</strong> {user?.nombre || user?.name}</p>
            <p><strong>📧 Email:</strong> {user?.email}</p>
            <p><strong>📱 Teléfono:</strong> {user?.telefono || user?.phone}</p>
          </div>
        </div>

        {/* Turnos */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-white mb-4">📅 Tus turnos</h3>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : turnos.length === 0 ? (
            <p className="text-center text-zinc-400">No tenés turnos registrados.</p>
          ) : (
            <ul className="space-y-4">
              {turnos.map((turno) => (
                <li
                  key={turno.id}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div className="space-y-1">
                    <p className="flex items-center gap-2"><Scissors size={16} /> <strong>Servicio:</strong> {turno.servicio}</p>
                    <p className="flex items-center gap-2"><CalendarDays size={16} /> <strong>Fecha:</strong> {formatDate(turno.fecha)}</p>
                    <p className="flex items-center gap-2"><Clock size={16} /> <strong>Hora:</strong> {formatTime(turno.hora)}</p>
                    <p className="flex items-center gap-2"><UserCircle size={16} /> <strong>Profesional:</strong> {turno.Profesional?.nombre}</p>
                    <p><strong>Especialidad:</strong> {turno.Profesional?.especialidad}</p>
                  </div>
                  <button
                    onClick={() => handleCancelarTurno(turno.id)}
                    className="mt-4 sm:mt-0 sm:ml-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cerrar sesión */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white to-pink-500 hover:opacity-90 text-black text-lg font-semibold rounded-xl shadow-lg transition-all duration-300"
          >
            <LogOut size={20} /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPerfil;
