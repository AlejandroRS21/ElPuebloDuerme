export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-8">
          Cómo Jugar
        </h1>

        {/* Introduction */}
        <section className="glass rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Introducción</h2>
          <p className="text-gray-300 mb-4">
            "El Pueblo Duerme" es un juego social de engaño y deducción donde los jugadores se dividen en dos bandos: 
            el <span className="text-red-500 font-semibold">Pueblo</span> y la <span className="text-red-700 font-semibold">Mafia</span>.
          </p>
          <p className="text-gray-300">
            El objetivo del pueblo es identificar y eliminar a todos los miembros de la mafia, mientras que la mafia 
            intenta eliminar a los aldeanos sin ser descubiertos.
          </p>
        </section>

        {/* Roles */}
        <section className="glass rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Roles del Juego</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-red-700 pl-4">
              <h3 className="text-xl font-bold text-red-600 mb-2">🔪 Mafia</h3>
              <p className="text-gray-300 mb-2">
                Los miembros de la mafia conocen la identidad de sus compañeros y trabajan juntos para eliminar 
                a los aldeanos durante la noche.
              </p>
              <p className="text-sm text-gray-400">
                <strong>Habilidad:</strong> Cada noche, la mafia elige a un jugador para eliminar.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-bold text-green-400 mb-2">💊 Doctor</h3>
              <p className="text-gray-300 mb-2">
                El doctor puede proteger a un jugador cada noche, salvándolo de ser eliminado por la mafia.
              </p>
              <p className="text-sm text-gray-400">
                <strong>Habilidad:</strong> Elige a un jugador para proteger durante la noche (puede protegerse a sí mismo).
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-bold text-blue-400 mb-2">🔍 Detective</h3>
              <p className="text-gray-300 mb-2">
                El detective puede investigar a un jugador cada noche para descubrir si es miembro de la mafia.
              </p>
              <p className="text-sm text-gray-400">
                <strong>Habilidad:</strong> Investiga a un jugador para saber si es mafia o no.
              </p>
            </div>

            <div className="border-l-4 border-gray-500 pl-4">
              <h3 className="text-xl font-bold text-gray-300 mb-2">👤 Aldeano</h3>
              <p className="text-gray-300 mb-2">
                Los aldeanos no tienen habilidades especiales, pero pueden votar durante el día para eliminar sospechosos.
              </p>
              <p className="text-sm text-gray-400">
                <strong>Habilidad:</strong> Participa en las discusiones y votaciones diurnas.
              </p>
            </div>
          </div>
        </section>

        {/* Game Phases */}
        <section className="glass rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Fases del Juego</h2>
          
          <div className="space-y-4">
            <div className="bg-black/50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-purple-400 mb-2">🌙 Fase de Noche</h3>
              <p className="text-gray-300 text-sm">
                Durante la noche, todos los jugadores cierran los ojos (metafóricamente). Los roles especiales 
                realizan sus acciones en secreto:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                <li>La mafia elige a quién eliminar</li>
                <li>El doctor elige a quién proteger</li>
                <li>El detective elige a quién investigar</li>
              </ul>
            </div>

            <div className="bg-black/50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">☀️ Fase de Día</h3>
              <p className="text-gray-300 text-sm">
                El pueblo despierta y se revelan los eventos de la noche. Los jugadores discuten y comparten 
                información para identificar a la mafia.
              </p>
            </div>

            <div className="bg-black/50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-orange-400 mb-2">🗳️ Fase de Votación</h3>
              <p className="text-gray-300 text-sm">
                Todos los jugadores votan para eliminar a un jugador sospechoso. El jugador con más votos 
                es eliminado del juego.
              </p>
            </div>

            <div className="bg-black/50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-red-400 mb-2">📊 Fase de Resultado</h3>
              <p className="text-gray-300 text-sm">
                Se revela el rol del jugador eliminado y se verifica si algún bando ha ganado. Si no, 
                comienza una nueva ronda.
              </p>
            </div>
          </div>
        </section>

        {/* Victory Conditions */}
        <section className="glass rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Condiciones de Victoria</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-950/30 rounded-lg p-4 border border-blue-800">
              <h3 className="text-lg font-bold text-blue-400 mb-2">🏆 Victoria del Pueblo</h3>
              <p className="text-gray-300 text-sm">
                El pueblo gana cuando todos los miembros de la mafia han sido eliminados del juego.
              </p>
            </div>

            <div className="bg-red-950/30 rounded-lg p-4 border border-red-800">
              <h3 className="text-lg font-bold text-red-400 mb-2">💀 Victoria de la Mafia</h3>
              <p className="text-gray-300 text-sm">
                La mafia gana cuando su número es igual o superior al número de aldeanos restantes.
              </p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="glass rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Consejos y Estrategias</h2>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <p className="text-gray-300 text-sm">
                <strong className="text-white">Comunícate:</strong> Las discusiones son clave. Comparte tus sospechas 
                y observaciones con los demás jugadores.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <p className="text-gray-300 text-sm">
                <strong className="text-white">Observa el comportamiento:</strong> Los miembros de la mafia pueden 
                mostrar patrones sospechosos en sus votaciones y discusiones.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <p className="text-gray-300 text-sm">
                <strong className="text-white">No reveles tu rol demasiado pronto:</strong> Si eres un rol especial, 
                mantén tu identidad en secreto hasta que sea estratégicamente beneficioso revelarla.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <p className="text-gray-300 text-sm">
                <strong className="text-white">La mafia debe coordinarse:</strong> Si eres mafia, trabaja con tus 
                compañeros sin hacer obvio que se conocen.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
