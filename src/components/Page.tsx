export const Page = () => {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header with image */}
        <header className="relative w-full h-[30rem]">
          <img
            src="\WhatsApp Image 2024-11-17 at 10.15.45 PM.jpeg" // Sustituye con la URL de tu imagen
            alt="Header Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
              Fundación Esperanza Para Todos
            </h1>
          </div>
        </header>
  
        {/* Content section */}
        <section className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 px-6 py-12">
          <div className="flex-1 bg-white p-8 rounded-lg shadow-lg transition hover:shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Misión</h2>
            <p className="text-gray-700 leading-relaxed">
              En Esperanza Para Todos, trabajamos incansablemente para proporcionar ayuda humanitaria y mejorar las condiciones de vida de las comunidades más vulnerables. Nuestra misión es transformar realidades, promoviendo el acceso a recursos básicos, la educación, la salud y el desarrollo sostenible, con un enfoque en la dignidad humana y la equidad.
            </p>
          </div>
          <div className="flex-1 bg-white p-8 rounded-lg shadow-lg transition hover:shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Visión</h2>
            <p className="text-gray-700 leading-relaxed">
              Ser reconocidos como un referente de solidaridad y transformación social, generando un impacto sostenible en las comunidades vulnerables a nivel local, nacional e internacional. Aspiramos a construir un mundo más justo, donde todas las personas tengan las oportunidades necesarias para una vida plena y digna.
            </p>
          </div>
          <div className="flex-1 bg-white p-8 rounded-lg shadow-lg transition hover:shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Política de Calidad</h2>
            <p className="text-gray-700 leading-relaxed">
              En Esperanza Para Todos, nos comprometemos a ofrecer servicios humanitarios de alta calidad que respondan eficazmente a las necesidades de las comunidades vulnerables. Promovemos la transparencia, la eficiencia y la mejora continua en nuestras acciones, garantizando el uso ético y responsable de los recursos. Fomentamos alianzas estratégicas y la participación activa de voluntarios, colaboradores y beneficiarios, asegurando un impacto positivo y duradero.
            </p>
          </div>
        </section>
  
        {/* Footer with login buttons */}
        <footer className="bg-blue-900 py-8">
          <div className="container mx-auto text-center">
            <h3 className="text-white text-xl mb-4 font-semibold">
              ¿Eres un cliente o proveedor? ¡Inicia sesión para acceder a más!
            </h3>
            <div className="space-x-4">
              <button
                onClick={() => (window.location.href = "/cliente/login")}
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 transition"
              >
                Inicio de Sesión Cliente
              </button>
              <button
                onClick={() => (window.location.href = "/proveedor/login")}
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-lg hover:bg-green-600 transition"
              >
                Inicio de Sesión Proveedor
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Page;
  
  