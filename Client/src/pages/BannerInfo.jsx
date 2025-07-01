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
        }
        .overflow-hidden-nowrap {
          overflow: hidden;
          white-space: nowrap;
        }
      `}</style>

      <div className="bg-black/90 text-white py-1 px-4 flex flex-col md:flex-row items-center justify-between text-sm md:text-base">

        {/* WhatsApp */}
        <div className="flex items-center mb-2 md:mb-0 overflow-hidden-nowrap max-w-xs md:max-w-md">
          <FaWhatsapp className="text-green-400 text-2xl mr-2 flex-shrink-0" />
          <span className="animate-scroll-left">
            ¡Contáctanos por WhatsApp! &nbsp; ¡Contáctanos por WhatsApp! &nbsp;
          </span>
        </div>

        {/* Horarios */}
        <div className="flex items-center mb-2 md:mb-0 overflow-hidden-nowrap max-w-xs md:max-w-md">
          <FaClock className="text-yellow-400 text-2xl mr-2 flex-shrink-0" />
          <span className="animate-scroll-left">
            Mar. a Vie. 11:00hs a 20:30hs / Sáb. 10:00hs a 20:30hs &nbsp; Mar. a Vie. 11:00hs a 20:30hs / Sáb. 10:00hs a 20:30hs &nbsp;
          </span>
        </div>

      </div>
    </>
  );
};

export default BannerInfo;
