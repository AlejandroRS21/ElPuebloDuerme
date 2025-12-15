import { LoginForm } from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-4 drop-shadow-lg">
            El Pueblo Duerme
          </h1>
          <p className="text-lg text-gray-300 mb-2">
            Juego multijugador de mafia en tiempo real
          </p>
          <p className="text-sm text-gray-500">
            ¿Puedes descubrir quién es la mafia antes de que sea demasiado tarde?
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
