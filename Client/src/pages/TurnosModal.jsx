import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;


const TurnosModal = ({ onClose }) => {
  // const [fechaHora, setFechaHora] = useState(null);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servicio, setServicio] = useState('');
  const [profesionalId, setProfesionalId] = useState('');
  const [disponibilidadId, setDisponibilidadId] = useState('');

  const [profesionales, setProfesionales] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState([]);

  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profesionales/con-disponibilidad`);
        setProfesionales(res.data);
      } catch (err) {
        console.error('Error al cargar profesionales:', err);
      }
    };

    fetchProfesionales();
  }, []);
//prof ID
  useEffect(() => {
    if (!profesionalId) {
      setDisponibilidades([]);
      setDisponibilidadId('');
      return;
    }

    const profesionalSeleccionado = profesionales.find(
      (prof) => prof.id === parseInt(profesionalId)
    );

    if (profesionalSeleccionado && profesionalSeleccionado.Disponibilidads) {
      setDisponibilidades(profesionalSeleccionado.Disponibilidads);
    } else {
      setDisponibilidades([]);
    }
    setDisponibilidadId('');
  }, [profesionalId, profesionales]);

  const handleSeleccionar = async () => {
    if (!nombre || !telefono || !servicio || !profesionalId || !disponibilidadId) {

      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      // const fechaISO = fechaHora.toISOString();
      // const fecha = fechaISO.split('T')[0];
      // const hora = fechaISO.split('T')[1].slice(0, 5);
      const fecha = new Date().toISOString().split('T')[0]; 
      const hora = '10:00';


      await axios.post(`${API_URL}/api/turnos`, {
        nombre,
        telefono,
        servicio,
        profesionalId: parseInt(profesionalId),
        disponibilidadId: parseInt(disponibilidadId),
        fecha,
        hora,
      });

      alert('Turno confirmado');
      onClose();
    } catch (error) {
      console.error('Error al confirmar turno:', error);
      alert('Error al confirmar turno');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Seleccionar turno</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />
        <input
          type="text"
          placeholder="Servicio"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />

        <select
          value={profesionalId}
          onChange={(e) => setProfesionalId(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        >
          <option value="">Seleccioná un profesional</option>
          {profesionales.map((prof) => {
            const primeraDisp = prof.Disponibilidades?.[0];
            const infoDisp = primeraDisp
              ? ` (${primeraDisp.dia} ${primeraDisp.horaInicio} a ${primeraDisp.horaFin})`
              : '';
            return (
              <option key={prof.id} value={prof.id}>
                {prof.nombre}{infoDisp}
              </option>
            );
          })}
        </select>

        <select
          value={disponibilidadId}
          onChange={(e) => setDisponibilidadId(e.target.value)}
          className="border w-full p-2 rounded mb-3"
          disabled={disponibilidades.length === 0}
        >
          <option value="">Seleccioná una disponibilidad</option>
          {disponibilidades.map((disp) => (
            <option key={disp.id} value={disp.id}>
              {disp.dia} - {disp.horaInicio} a {disp.horaFin}
            </option>
          ))}
        </select>

     
        <button
  onClick={handleSeleccionar}
  disabled={!disponibilidadId || !profesionalId}
  className="mt-3 w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-300"
>
  Confirmar Turno
</button>

      </div>
    </div>
  );
};

export default TurnosModal;
