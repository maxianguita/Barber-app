import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';

const API_URL = import.meta.env.VITE_API_URL;

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const getDateOfCurrentWeek = (diaSemana) => {
  const today = new Date();
  const currentDay = today.getDay();
  const targetDay = diasSemana.findIndex((d) => d.toLowerCase() === diaSemana.toLowerCase());
  const diff = targetDay - currentDay;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);
  return targetDate;
};

const servicios = [
  { nombre: 'CORTE DE CABELLO', precio: '$15.000', duracion: '40min', servicio: 'Corte de cabello' },
  { nombre: 'CORTE DE CABELLO Y ARREGLO DE BARBA', precio: '$20.000', duracion: '1h', servicio: 'Corte + Barba' },
  { nombre: 'ARREGLO DE BARBA', precio: '$8.000', duracion: '30min', servicio: 'Barba' },
  { nombre: 'COLORACION DE CABELLO/COLOR Y REFLEJOS', precio: '$45.000', duracion: '1h 40min', servicio: 'Coloración' },
];

const CustomDayHeader = ({ date }) => (
  <div className="h-full w-full bg-gray-300 flex items-center justify-center text-black font-semibold">
    {diasSemana[date.getDay()]}
  </div>
);

const TurnosPage = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servicio, setServicio] = useState('');
  const [profesionalId, setProfesionalId] = useState('');
  const [disponibilidadId, setDisponibilidadId] = useState('');
  const [profesionales, setProfesionales] = useState([]);
  const [eventos, setEventos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profesionales/con-disponibilidad`);
        setProfesionales(res.data);
      } catch (err) {
        toast.error('Error al cargar profesionales');
      }
    };
    fetchProfesionales();
  }, []);

  useEffect(() => {
    if (!profesionalId) {
      setDisponibilidadId('');
      setEventos([]);
      return;
    }

    const profesional = profesionales.find((p) => p.id === parseInt(profesionalId));
    if (profesional?.disponibilidades) {
      const eventosCalendario = profesional.disponibilidades.map((disp) => {
        const fecha = getDateOfCurrentWeek(disp.dia);
        const [hInicio, mInicio] = disp.horaInicio.split(':');
        const [hFin, mFin] = disp.horaFin.split(':');

        const start = new Date(fecha);
        start.setHours(+hInicio, +mInicio, 0, 0);

        const end = new Date(fecha);
        end.setHours(+hFin, +mFin, 0, 0);

        return {
          id: disp.id,
          title: 'Disponible',
          start,
          end,
        };
      });

      setEventos(eventosCalendario);
    } else {
      setEventos([]);
    }

    setDisponibilidadId('');
  }, [profesionalId, profesionales]);

  const isFormularioCompleto =
    nombre.trim() && telefono.trim() && servicio && profesionalId && disponibilidadId;

  const handleConfirmarTurno = async () => {
    if (!isFormularioCompleto) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No hay token. Iniciá sesión nuevamente');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const usuarioId = decodedToken.id;

      const fecha = new Date().toISOString().split('T')[0];
      const hora = '10:00';

      await axios.post(
        `${API_URL}/api/turnos`,
        {
          nombre,
          telefono,
          servicio,
          profesionalId: parseInt(profesionalId),
          disponibilidadId: parseInt(disponibilidadId),
          fecha,
          hora,
          usuarioId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Turno confirmado');

      setNombre('');
      setTelefono('');
      setServicio('');
      setProfesionalId('');
      setDisponibilidadId('');
      setEventos([]);
    } catch (err) {
      console.error('Error al confirmar turno:', err.response?.data || err.message);
      toast.error('Error al confirmar turno');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black flex flex-col px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-100 hover:text-gray-400 transition mb-6 mt-2 ml-2 sm:ml-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio
        </button>

        <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col gap-8 mt-8 sm:mt-12 md:mt-20 lg:mt-24">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">AGENDA TU TURNO</h1>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(val)) setNombre(val);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) setTelefono(val);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <select
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Seleccioná un servicio</option>
                {servicios.map((s, i) => (
                  <option key={i} value={s.servicio}>
                    {s.nombre} - {s.precio}
                  </option>
                ))}
              </select>

              <select
                value={profesionalId}
                onChange={(e) => setProfesionalId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Seleccioná un profesional</option>
                {profesionales.map((prof) => {
                  const d = prof.disponibilidades?.[0];
                  const info = d ? ` (${d.dia} ${d.horaInicio} a ${d.horaFin})` : '';
                  return (
                    <option key={prof.id} value={prof.id}>
                      {prof.nombre}
                      {info}
                    </option>
                  );
                })}
              </select>
            </div>

            <Calendar
              localizer={localizer}
              events={eventos}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 400, backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}
              selectable
              views={['week']}
              defaultView="week"
              toolbar={false}
              min={new Date(0, 0, 0, 8, 0)}
              max={new Date(0, 0, 0, 22, 0)}
              step={30}
              timeslots={2}
              onSelectEvent={(event) => {
                setDisponibilidadId(event.id);
                toast(
                  `Seleccionaste: ${event.title} el ${event.start.toLocaleDateString()} de ${event.start.toLocaleTimeString()} a ${event.end.toLocaleTimeString()}`
                );
              }}
              components={{ week: { header: CustomDayHeader } }}
            />
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={handleConfirmarTurno}
            disabled={!isFormularioCompleto}
            className={`w-auto px-20 py-4 transition font-semibold rounded-lg shadow ${
              isFormularioCompleto
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Confirmar Turno
          </button>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
};

export default TurnosPage;
