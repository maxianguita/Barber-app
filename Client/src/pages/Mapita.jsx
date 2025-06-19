import React from 'react';

const Mapita = () => {
  return (
    <div className="w-full bg-gray-50 py-16">
      <section className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 items-center justify-between">

        {/* Contacto */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center md:text-left">
            Contactanos
          </h2>
          <p className="text-gray-600 mb-8 text-center md:text-left text-lg">
            Escribinos o acercate a nuestra barbería para más información.
          </p>

          <div className="space-y-4 text-gray-800 text-md font-medium">
            <p>
              📧 <span className="text-gray-600">Barberdeluxe@gmail.com</span>
            </p>
            <p>
              📞 <span className="text-gray-600">+54 (11) 4794 - 7679</span>
            </p>
            <p>
              📍 <span className="text-gray-600">Avenida Mitre 866, Quilmes</span>
            </p>
          </div>
        </div>

        {/* Mapa */}
        <div className="w-full md:w-1/2 h-64 md:h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Ubicación Barbería"
            src="https://www.google.com/maps?q=Avenida+Mitre+866,+Quilmes,+Buenos+Aires,+Argentina&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Mapita;
