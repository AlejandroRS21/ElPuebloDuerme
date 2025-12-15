'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/90 border-t border-red-900/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-red-500 mb-4">El Pueblo Duerme</h3>
            <p className="text-sm text-gray-400">
              Juego multijugador de mafia en tiempo real. Descubre quién es la mafia antes de que sea demasiado tarde.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-red-500 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-to-play" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Cómo Jugar
                </Link>
              </li>
              <li>
                <Link href="/cards" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Cartas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/lobby" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Salas
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-red-500 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">
                © {currentYear} El Pueblo Duerme
              </li>
              <li className="text-sm text-gray-400">
                Todos los derechos reservados
              </li>
              <li>
                <a
                  href="https://github.com/AlejandroRS21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-red-900/30 text-center">
          <p className="text-xs text-gray-500">
            Desarrollado con Next.js 14, TypeScript y Capacitor
          </p>
        </div>
      </div>
    </footer>
  );
}
