import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Pueblo Duerme",
  description: "Juego multijugador de mafia en tiempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
