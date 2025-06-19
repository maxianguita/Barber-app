import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import corteCabelloImg from '../assets/barber_files/cabello.jpg';
import perfiladoBarbaImg from '../assets/barber_files/barba1.jpg';
import afeitadoTradicionalImg from '../assets/barber_files/barba2.jpg';
import corte from '../assets/barber_files/cabello.jpg';
import afeitado from '../assets/barber_files/perfilbarba.jpg';
import Mapita from '../pages/Mapita';

const Home = () => {
  const navigate = useNavigate();
  const [showWhatsApp, setShowWhatsApp] = useState(true);

  useEffect(() => {
    const rol = localStorage.getItem('rol');
    if (rol === 'admin') navigate('/admin');
  }, [navigate]);

  useEffect(() => {
    const checkMenuStatus = () => {
      const menuStatus = localStorage.getItem('menuOpen');
      setShowWhatsApp(menuStatus !== 'true');
    };

    checkMenuStatus(); // Check on mount

    const interval = setInterval(checkMenuStatus, 300); // Listen every 300ms

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 space-y-24 bg-gray-50 mt-180 overflow-x-hidden">
      
      {/* Servicios */}
      <section id="servicios" className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Nuestros Servicios</h2>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Conocé todos los cortes, afeitadas y tratamientos que ofrecemos para brindarte la mejor experiencia en nuestra barbería.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title: 'Corte de Cabello',
            img: corteCabelloImg,
            desc: 'Cortes clásicos y modernos adaptados a tu estilo personal.'
          }, {
            title: 'Perfilado de Barba',
            img: perfiladoBarbaImg,
            desc: 'Barbas cuidadas al detalle, usando técnicas profesionales.'
          }, {
            title: 'Tinturas',
            img: afeitadoTradicionalImg,
            desc: 'Coloración de alta calidad para renovar tu estilo.'
          }].map((item, idx) => (
            <div key={idx} className="relative rounded-xl overflow-hidden shadow-sm group">
              <img src={item.img} alt={item.title} className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-300 blur-sm brightness-75" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Turnos */}
      <section className="w-full bg-black text-white rounded-xl shadow-md p-10 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">¡Reservá tu turno online!</h2>
          <p className="text-lg">Agendá tu cita con tu barbero favorito en segundos.</p>
        </div>
        <Link to="/turnos">
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Reservá ya
          </button>
        </Link>
      </section>

      {/* Cursos */}
      <section className="w-full max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Cursos de Barbería</h2>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Aprende de los mejores y transformá tu pasión en una carrera.
        </p>

        <div className="flex flex-col space-y-12">
          {/* Curso Corte */}
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2">Curso de Corte Masculino</h3>
              <p className="text-gray-600">Domina técnicas básicas y avanzadas de cortes para hombres.</p>
            </div>
            <img src={corte} alt="Curso Corte" className="w-full max-w-xs h-48 object-cover rounded-lg shadow" />
          </div>

          {/* Curso Afeitado */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2">Curso de Perfilado y Afeitado</h3>
              <p className="text-gray-600">Aprendé técnicas tradicionales de afeitado y perfilado de barba.</p>
            </div>
            <img src={afeitado} alt="Curso Afeitado" className="w-full max-w-xs h-48 object-cover rounded-lg shadow" />
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      {showWhatsApp && (
        <a
          href="https://wa.me/5491135636555"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-400 text-white text-3xl p-3 rounded-full shadow-md transition-all"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      )}

      {/* Mapa */}
      <div className="w-full max-w-6xl">
        <Mapita />
      </div>
    </div>
  );
};

export default Home;
