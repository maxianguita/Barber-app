import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../assets/barber_files/barbershop.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-16 text-xl">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          {/* Sección de Información */}
          <div>
          <a href="/" className="flex items-center gap-4">
            <img
               src={logo}
               alt="Barbería Deluxe Logo"
               className="h-30 w-32 object-contain " 
            />
          </a>
            <p className="text-gray-200">Tu lugar de confianza para un corte de cabello, barba y más. Estilo, tradición y excelencia en cada servicio.</p>
          </div>

          {/* Sección de Contacto */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contacto</h3>
            <ul>
              <li className="mb-2 text-white">
                <i className="fas fa-map-marker-alt mr-2"></i> Avenida Mitre 866, Ciudad
              </li>
              <li className="mb-2">
                <i className="fas fa-phone mr-2"></i> +54 9 11 1234-5678
              </li>
              <li className="mb-2">
                <i className="fas fa-envelope mr-2 text-white "></i> contacto@barberiadeluxe.com
              </li>
            </ul>
          </div>

          {/* Sección de Redes Sociales */}
          <div>
            <h3 className="text-3xl font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-200 hover:text-white">
                <i className="fab fa-facebook-f fa-1x"></i>
              </a>
              <a href="#" className="text-gray-200 hover:text-white">
                <i className="fab fa-instagram fa-1x"></i>
              </a>
              <a href="#" className="text-gray-100 hover:text-white ">
              <i className="fab fa-twitter fa-1x"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-gray-400">
          <p>&copy; {new Date().getFullYear()} Barbería Deluxe. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
