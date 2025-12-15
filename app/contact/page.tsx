import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-4">
          Contacto
        </h1>
        <p className="text-center text-gray-300 mb-12">
          Estamos aquí para ayudarte con cualquier duda o sugerencia
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="glass rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="text-lg font-bold text-white mb-2">Email</h3>
            <p className="text-sm text-gray-400">
              <a href="mailto:support@elpuebloduerme.com" className="hover:text-red-400 transition-colors">
                support@elpuebloduerme.com
              </a>
            </p>
          </div>

          <div className="glass rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-lg font-bold text-white mb-2">Discord</h3>
            <p className="text-sm text-gray-400">
              Únete a nuestra comunidad en Discord
            </p>
          </div>

          <div className="glass rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🐙</div>
            <h3 className="text-lg font-bold text-white mb-2">GitHub</h3>
            <p className="text-sm text-gray-400">
              <a 
                href="https://github.com/AlejandroRS21/ElPuebloDuerme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors"
              >
                Contribuye al proyecto
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* FAQ Section */}
        <div className="mt-12 glass rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-500 mb-6">Preguntas Frecuentes</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">¿Cómo creo una partida?</h3>
              <p className="text-sm text-gray-300">
                Una vez registrado e iniciada sesión, ve a la sección "Salas" y haz clic en "Crear Sala". 
                Configura las opciones de tu partida y comparte el código con tus amigos.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">¿Cuántos jugadores se necesitan?</h3>
              <p className="text-sm text-gray-300">
                El juego requiere un mínimo de 4 jugadores y soporta hasta 15 jugadores para una experiencia óptima.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">¿Puedo jugar desde mi móvil?</h3>
              <p className="text-sm text-gray-300">
                ¡Sí! El Pueblo Duerme está disponible tanto en navegador web como en aplicaciones nativas 
                para Android e iOS gracias a Capacitor.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">¿El juego es gratuito?</h3>
              <p className="text-sm text-gray-300">
                Sí, El Pueblo Duerme es completamente gratuito y de código abierto. No hay compras 
                dentro de la aplicación ni anuncios.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">¿Cómo reporto un bug?</h3>
              <p className="text-sm text-gray-300">
                Puedes reportar bugs a través de este formulario de contacto o directamente en nuestro 
                repositorio de GitHub creando un issue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
