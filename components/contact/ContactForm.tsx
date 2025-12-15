'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="bg-black/60 border-red-900/50">
      <CardHeader>
        <CardTitle className="text-2xl text-red-500">Envíanos un Mensaje</CardTitle>
        <CardDescription className="text-gray-400">
          ¿Tienes alguna pregunta, sugerencia o problema? Estamos aquí para ayudarte.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="bg-black/50 border-gray-700 text-white"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-black/50 border-gray-700 text-white"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
              Asunto
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              className="bg-black/50 border-gray-700 text-white"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>

          {submitted && (
            <div className="p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-300 text-sm">
              ¡Mensaje enviado correctamente! Te responderemos pronto.
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
