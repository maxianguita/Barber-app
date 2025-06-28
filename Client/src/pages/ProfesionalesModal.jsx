import React, { useEffect, useState } from 'react';
const ProfesionalesModal = ({ onClose }) => {
  const [profesionales, setProfesionales] = useState([]);
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [disponibilidad, setDisponibilidad] = useState([{ dia: '', horaInicio: '', horaFin: '' }]);

  const API_URL = import.meta.env.VITE_API_URL.trim();


  
  // Extraigo fetchProfesionales para usarlo en varios lugares
  const fetchProfesionales = async () => {
    try {
      const res = await fetch(`${API_URL}/api/profesionales/con-disponibilidad`);
     
      const data = await res.json();
      console.log(data);
      setProfesionales(data);
    } catch (err) {
      console.error('Error al cargar profesionales con disponibilidad:', err);
    }
  };

  useEffect(() => {
    fetchProfesionales();
  }, []);

  const handleDisponibilidadChange = (index, field, value) => {
    const updated = [...disponibilidad];
    updated[index][field] = value;
    setDisponibilidad(updated);
  };

  const agregarCampoDisponibilidad = () => {
    setDisponibilidad([...disponibilidad, { dia: '', horaInicio: '', horaFin: '' }]);
  };

  const eliminarCampoDisponibilidad = (index) => {
    const updated = [...disponibilidad];
    updated.splice(index, 1);
    setDisponibilidad(updated);
  };

  const agregarProfesional = async (e) => {
    e.preventDefault();

    const nombreTrim = nombre.trim();
    const especialidadTrim = especialidad.trim();
    const disponibilidadFiltrada = disponibilidad.filter(d => d.dia && d.horaInicio && d.horaFin);

    if (!nombreTrim || !especialidadTrim || disponibilidadFiltrada.length === 0) return;

    try {
      const res = await fetch(`${API_URL}/api/profesionales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreTrim,
          especialidad: especialidadTrim,
          disponibilidad: disponibilidadFiltrada,
        }),
      });

      if (!res.ok) throw new Error('Error al agregar profesional');

      // const nuevo = await res.json();
      // En vez de agregar manualmente al arreglo, vuelvo a traer la lista para asegurarme
      await fetchProfesionales();

      setNombre('');
      setEspecialidad('');
      setDisponibilidad([{ dia: '', horaInicio: '', horaFin: '' }]);
    } catch (err) {
      console.error('Error al agregar profesional:', err);
    }
  };

  const eliminarProfesional = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/profesionales/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar profesional');

      // También aquí actualizo con fetch para mantener sincronizado
      await fetchProfesionales();
    } catch (err) {
      console.error('Error al eliminar profesional:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl shadow-lg text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Gestionar Profesionales</h2>

        <form onSubmit={agregarProfesional} className="mb-6 space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Especialidad</label>
            <select
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              required
            >
              <option value="">Selecciona una especialidad</option>
              <option value="Corte de pelo">Corte de pelo</option>
              <option value="Arreglo de barba">Arreglo de barba</option>
              <option value="Coloración de cabello">Coloración de cabello</option>
            </select>
          </div>

          <div>
            <h3 className="font-bold mb-2">Disponibilidad</h3>
            {disponibilidad.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 mb-2">
                <select
                  value={item.dia}
                  onChange={(e) => handleDisponibilidadChange(idx, 'dia', e.target.value)}
                  className="px-2 py-1 bg-gray-700 text-white rounded"
                  required
                >
                  <option value="">Día</option>
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miércoles">Miércoles</option>
                  <option value="Jueves">Jueves</option>
                  <option value="Viernes">Viernes</option>
                  <option value="Sábado">Sábado</option>
                </select>
                <input
                  type="time"
                  value={item.horaInicio}
                  onChange={(e) => handleDisponibilidadChange(idx, 'horaInicio', e.target.value)}
                  className="px-2 py-1 bg-gray-700 text-white rounded"
                  required
                />
                <input
                  type="time"
                  value={item.horaFin}
                  onChange={(e) => handleDisponibilidadChange(idx, 'horaFin', e.target.value)}
                  className="px-2 py-1 bg-gray-700 text-white rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => eliminarCampoDisponibilidad(idx)}
                  className="text-red-400 text-xl px-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={agregarCampoDisponibilidad}
              className="text-green-400 text-sm mt-1"
            >
              + Agregar otro horario
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
          >
            Agregar Profesional
          </button>
        </form>

        {profesionales.length === 0 ? (
          <p className="text-gray-400">No hay profesionales cargados.</p>
        ) : (
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {profesionales.map((prof) => (
              <li key={prof.id} className="bg-gray-700 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-lg font-semibold">{prof.nombre}</p>
                    <p className="text-sm text-gray-300">{prof.especialidad}</p>
                  </div>
                  <button
                    onClick={() => eliminarProfesional(prof.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="text-sm text-green-300">
                  <strong>Disponibilidad:</strong>
                  
                  {/* <ul className="list-disc ml-4 mt-1">
                    {profesionales.map((profesional) => (
                   <div key={profesional.id}>
                     <h3>{profesional.nombre}</h3>
                     <p>Especialidad: {profesional.especialidad}</p>
                     <h4>Disponibilidad:</h4>
                     {profesional.disponibilidades && profesional.disponibilidades.length > 0 ? (
                       <ul>
                         {profesional.disponibilidades.map((disp) => (
                           <li key={disp.id}>
                          {disp.dia}: {disp.horaInicio} - {disp.horaFin}
                            </li>
                          ))}
                        </ul>
                      ) : (
                       <p>No hay disponibilidad cargada</p>
                      )}
                    </div>
                  ))}
                </ul> */}
                <ul className="list-disc ml-4 mt-1">
  {prof.disponibilidades && prof.disponibilidades.length > 0 ? (
    prof.disponibilidades.map((disp, idx) => (
      <li key={idx}>
        {disp.dia}: {disp.horaInicio} - {disp.horaFin}
      </li>
    ))
  ) : (
    <li>No hay disponibilidad cargada</li>
  )}
</ul>

                
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfesionalesModal;
