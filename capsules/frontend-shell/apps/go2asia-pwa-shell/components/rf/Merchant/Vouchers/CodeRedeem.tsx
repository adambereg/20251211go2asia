'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Badge } from '@go2asia/ui';
import { CheckCircle2, XCircle } from 'lucide-react';

export function CodeRedeem() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRedeem = () => {
    // Заглушка: имитация погашения ваучера
    if (code.length >= 6) {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setCode('');
      }, 2000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <Card className="border-blue-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Погашение ваучера</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Введите код ваучера
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="XXXX-XXXX-XXXX"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 size={20} />
              <span className="font-medium">Ваучер успешно погашен!</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600">
              <XCircle size={20} />
              <span className="font-medium">Неверный код ваучера</span>
            </div>
          )}
          <Button variant="primary" onClick={handleRedeem} className="w-full">
            Погасить ваучер
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

