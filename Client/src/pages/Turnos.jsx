import React, { useState } from 'react';

const Turnos = () => {
  const [turno, setTurno] = useState({
    nombre: "",
    telefono: "",
    servicio: "",
    fecha: "",
    hora: "",
  });

  const [showModal, setShowModal] = useState(false);

  const servicios = [
    { nombre: "Corte de pelo", precio: 10000 },
    { nombre: "Afeitado", precio: 5000 },
    { nombre: "Perfilado de barba", precio: 3500 },
  ];

  const handleChange = (e) => {
    setTurno({
      ...turno,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Mostrar modal al reservar turno
    // Acá podrías enviar los datos a un backend
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-8 mt-40">

      {/* Formulario */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center ">Reservar Turno</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={turno.nombre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Tu teléfono"
            value={turno.telefono}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="servicio"
            value={turno.servicio}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Elige un servicio</option>
            {servicios.map((servicio, index) => (
              <option key={index} value={servicio.nombre}>
                {servicio.nombre}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="fecha"
            value={turno.fecha}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="time"
            name="hora"
            value={turno.hora}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition">
            Reservar Turno
          </button>
        </form>
      </div>

      {/* Servicios */}
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-bold mb-4 text-center">Nuestros Servicios</h3>
        <ul className="space-y-4">
          {servicios.map((servicio, index) => (
            <li key={index} className="flex justify-between bg-sky-900 text-white p-4 rounded shadow">
              <span>{servicio.nombre}</span>
              <span>${servicio.precio}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">¡Turno reservado!</h2>
            <p className="mb-4">{`Hola ${turno.nombre}, te esperamos el ${turno.fecha} a las ${turno.hora}`}</p>
            <button
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Turnos;
