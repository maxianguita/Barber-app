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
      `}</style>

      <div className="bg-black/90 text-white py-2 px-6 flex flex-col md:flex-row items-center justify-between text-sm md:text-base">

        {/* WhatsApp */}
        <div className="flex items-center mb-2 md:mb-0 max-w-xs md:max-w-md relative overflow-hidden mr-auto pl-8">
          <FaWhatsapp className="text-green-400 text-2xl absolute left-0 top-1/2 transform -translate-y-1/2" />
          <div className="overflow-hidden whitespace-nowrap relative w-full pl-12">
            <span className="inline-block animate-scroll-left">
              ¡Contáctanos por WhatsApp! &nbsp; ¡Contáctanos por WhatsApp! &nbsp;
            </span>
          </div>
        </div>

        {/* Horarios */}
        <div className="flex items-center mb-2 md:mb-0 max-w-xs md:max-w-md relative overflow-hidden mr-auto pl-8">
          <FaClock className="text-yellow-400 text-2xl absolute left-0 top-1/2 transform -translate-y-1/2" />
          <div className="overflow-hidden whitespace-nowrap relative w-full pl-10">
            <span className="inline-block animate-scroll-left">
              Mar. a Vie. 11:00hs a 20:30hs / Sáb. 10:00hs a 20:30hs &nbsp; Mar. a Vie. 11:00hs a 20:30hs / Sáb. 10:00hs a 20:30hs &nbsp;
            </span>
          </div>
        </div>

      </div>
    </>
  );
};

export default BannerInfo;
