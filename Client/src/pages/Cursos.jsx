import React from 'react';
import { useNavigate } from 'react-router-dom';
import corte from '../assets/barber_files/cabello.jpg';
import afeitado from '../assets/barber_files/perfilbarba.jpg';
import coloracion from '../assets/barber_files/coloracion.jpg';

const Cursos = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Botón Volver */}
      <div className="px-6 pt-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Home
        </button>
      </div>

      {/* Contenido */}
      <section id="cursos" className="px-6 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Cursos de Barbería</h2>
          <p className="text-base sm:text-lg text-gray-600">
            Formate con profesionales del rubro y descubrí tu potencial como barbero.
            Nuestros cursos están diseñados para que aprendas desde cero o mejores tus técnicas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card Corte */}
          <div className="border rounded-xl overflow-hidden shadow hover:shadow-md transition">
            <img
              src={corte}
              alt="Curso de Corte"
              className="w-full h-52 sm:h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Corte Masculino Profesional</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Aprendé cortes clásicos, modernos y degradados. Ideal para quienes buscan una salida laboral rápida o perfeccionar su técnica.
              </p>
            </div>
          </div>

          {/* Card Afeitado */}
          <div className="border rounded-xl overflow-hidden shadow hover:shadow-md transition">
            <img
              src={afeitado}
              alt="Curso de Afeitado"
              className="w-full h-52 sm:h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Perfilado y Afeitado Tradicional</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Técnicas de afeitado clásico con navaja, cuidado de la piel y perfilado profesional de barba. Incluye prácticas en modelos reales.
              </p>
            </div>
          </div>

          {/* Card Coloración */}
          <div className="md:col-span-2 border rounded-xl overflow-hidden shadow hover:shadow-md transition max-w-4xl mx-auto">
            <img
              src={coloracion}
              alt="Curso de Coloración de Cabello"
              className="w-full h-52 sm:h-72 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Coloración Profesional de Cabello</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Aprende técnicas modernas de coloración, decoloración y tratamientos capilares para ofrecer un servicio completo y personalizado a tus clientes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cursos;
