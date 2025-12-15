'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface RoomCodeProps {
  code: string;
  className?: string;
}

export function RoomCode({ code, className = '' }: RoomCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Format code with spaces every 4 characters
  const formattedCode = code.match(/.{1,4}/g)?.join(' ') || code;

  return (
    <div className={`glass rounded-lg p-4 ${className}`}>
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-2">Código de Sala</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl md:text-3xl font-mono font-bold text-red-500 tracking-wider">
            {formattedCode}
          </span>
          <Button
            onClick={handleCopy}
            size="sm"
            variant="outline"
            className="border-red-900 text-red-500 hover:bg-red-900/20"
          >
            {copied ? '✓ Copiado' : '📋 Copiar'}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Comparte este código para que otros puedan unirse
        </p>
      </div>
    </div>
  );
}
