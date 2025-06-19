import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp, FaClock } from 'react-icons/fa';



const BannerInfo = () => {
  const location = useLocation();
  if (location.pathname === '/login') return null;

  return (
    <div className="bg-black/90 text-white py-1 px-4 flex flex-col md:flex-row items-center justify-between  text-sm md:text-base">

      {/* WhatsApp */}
      <div className="flex items-center mb-2 md:mb-0">
        <FaWhatsapp className="text-green-400 text-2xl mr-2" />
        <a 
          href="https://wa.me/5491135636555" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:underline"
        >
          ¡Contáctanos por WhatsApp!
        </a>
      </div>

      {/* Horarios */}
      <div className="flex items-center mb-2 md:mb-0">
        <FaClock className="text-yellow-400 text-2xl mr-2" />
        <span>Mar. a Vie. 11:00hs a 20:30hs / Sáb. 10:00hs a 20:30hs</span>
      </div>

      

    </div>
  );
};

export default BannerInfo;
