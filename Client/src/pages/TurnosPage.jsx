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

const TurnosPage = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servicio, setServicio] = useState('');
  const [profesionalId, setProfesionalId] = useState('');
  const [disponibilidadId, setDisponibilidadId] = useState('');
  const [profesionales, setProfesionales] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState([]);
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
      setDisponibilidades([]);
      setDisponibilidadId('');
      setEventos([]);
      return;
    }

    const profesional = profesionales.find((p) => p.id === parseInt(profesionalId));
    if (profesional?.disponibilidades) {
      setDisponibilidades(profesional.disponibilidades);

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
      setDisponibilidades([]);
      setEventos([]);
    }

    setDisponibilidadId('');
  }, [profesionalId, profesionales]);

  const isFormularioCompleto =
    nombre.trim() &&
    telefono.trim() &&
    servicio &&
    profesionalId &&
    disponibilidadId;

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

      // Decodificar token para extraer usuarioId
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Turno confirmado');

      setNombre('');
      setTelefono('');
      setServicio('');
      setProfesionalId('');
      setDisponibilidadId('');
      setDisponibilidades([]);
      setEventos([]);
    } catch (err) {
      console.error('Error al confirmar turno:', err.response?.data || err.message);
      toast.error('Error al confirmar turno');
    }
  };

  const CustomDayHeader = ({ date }) => (
    <div className="text-gray-700 text-sm font-semibold">
      {diasSemana[date.getDay()]}
    </div>
  );

  return (
    <>
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-indigo-600 transition mb-6 mt-10"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver al inicio
      </button>

      <div className="min-h-screen bg-gray-100 px-4 py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reservá tu Turno</h1>

          <div className="space-y-4">
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
                    {prof.nombre}{info}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mt-8">
            <Calendar
              localizer={localizer}
              events={eventos}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 400 }}
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
                toast(`Seleccionaste: ${event.title} el ${event.start.toLocaleDateString()} de ${event.start.toLocaleTimeString()} a ${event.end.toLocaleTimeString()}`);
              }}
              components={{ week: { header: CustomDayHeader } }}
            />
          </div>

          <button
            onClick={handleConfirmarTurno}
            disabled={!isFormularioCompleto}
            className={`mt-6 w-full py-2 rounded-lg transition font-semibold ${
              isFormularioCompleto
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Confirmar Turno
          </button>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default TurnosPage;
