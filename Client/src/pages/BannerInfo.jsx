import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp, FaClock } from 'react-icons/fa';

const BannerInfo = () => {
  const location = useLocation();
  if (location.pathname === '/login') return null;

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
          display: inline-block;
          white-space: nowrap;
          position: relative;
          z-index: 0;
        }
        .overflow-hidden-nowrap {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          width: 100%;
        }
        .icon-container {
          position: relative;
          z-index: 10; /* Más arriba para estar sobre el texto */
          flex-shrink: 0;
        }
        .text-container {
          position: relative;
          z-index: 0; /* Texto debajo */
          margin-left: -1.5rem; /* Ajusta para que el texto empiece justo detrás del ícono */
          padding-left: 1.5rem; /* Para que el texto visible no quede cortado */
        }
      `}</style>

      <div className="bg-black/90 text-white py-2 px-6 flex flex-col md:flex-row items-center justify-between text-sm md:text-base">

        {/* WhatsApp */}
        <div className="flex items-center mb-2 md:mb-0 max-w-xs md:max-w-md relative overflow-hidden-nowrap">
          <FaWhatsapp className="text-green-400 text-2xl icon-container" />
          <div className="text-container overflow-hidden-nowrap">
            <span className="animate-scroll-left">
              ¡Contáctanos por WhatsApp! &nbsp; ¡Contáctanos por WhatsApp! &nbsp;
            </span>
          </div>
        </div>

        {/* Horarios */}
        <div className="flex items-center mb-2 md:mb-0 max-w-xs md:max-w-md relative overflow-hidden-nowrap">
          <FaClock className="text-yellow-400 text-2xl icon-container" />
          <div className="text-container overflow-hidden-nowrap">
            <span className="animate-scroll-left">
              Mar. a Vie. 11:00hs a 20:30hs / Sáb. 10:00hs a 20:30hs &nbsp; Mar. a Vie. 11:00hs a 20:30hs / Sáb. 10:00hs a 20:30hs &nbsp;
            </span>
          </div>
        </div>

      </div>
    </>
  );
};

export default BannerInfo;
