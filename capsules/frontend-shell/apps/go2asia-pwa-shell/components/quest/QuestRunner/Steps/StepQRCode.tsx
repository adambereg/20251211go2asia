'use client';

/**
 * Quest Asia - Step QR Code
 * Компонент для сканирования QR-кода
 */

import { useState, useRef, useEffect } from 'react';
import { QrCode, CheckCircle2, AlertCircle, Loader2, Keyboard } from 'lucide-react';
import type { QuestStep, StepResult } from '@/components/quest/types';
import { validateQRCode } from '@/components/quest/utils/validation';

interface StepQRCodeProps {
  step: QuestStep;
  onComplete: (result: StepResult) => void;
}

export function StepQRCode({ step, onComplete }: StepQRCodeProps) {
  const [scannedCode, setScannedCode] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Инициализация камеры для сканирования QR
  const startScanning = async () => {
    try {
      setIsScanning(true);
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Задняя камера
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // TODO: Интеграция с библиотекой для сканирования QR (например, jsQR или html5-qrcode)
      // Здесь будет логика распознавания QR-кода из видеопотока
    } catch (err) {
      setError('Не удалось получить доступ к камере. Проверьте разрешения.');
      setIsScanning(false);
      console.error('Camera error:', err);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const handleCodeSubmit = (code: string) => {
    if (!step.qrCode && !step.code) {
      setError('QR-код не настроен для этого шага');
      return;
    }

    const expectedCode = step.qrCode || step.code || '';
    const validation = validateQRCode(code, expectedCode);

    if (!validation.valid) {
      setError(validation.reason || 'Неверный QR-код');
      return;
    }

    // Успешное сканирование
    const result: StepResult = {
      stepId: step.id,
      completed: true,
      completedAt: new Date(),
      method: 'qr',
      data: {
        qrCode: code,
      },
      points: step.rewards.points,
      synced: false,
    };

    stopScanning();
    onComplete(result);
  };

  const handleManualSubmit = () => {
    if (!manualCode.trim()) {
      setError('Введите код');
      return;
    }
    handleCodeSubmit(manualCode.trim());
  };

  // Демо-функция для тестирования (в реальном приложении будет распознавание из видеопотока)
  const handleDemoScan = () => {
    if (step.qrCode || step.code) {
      handleCodeSubmit(step.qrCode || step.code || '');
    }
  };

  return (
    <div className="space-y-4">
      {/* Инструкция */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <QrCode className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Отсканируйте QR-код</p>
            <p className="text-xs text-slate-600 mt-1">
              Наведите камеру на QR-код или введите код вручную
            </p>
          </div>
        </div>
      </div>

      {/* Видеопоток камеры */}
      {isScanning && (
        <div className="relative bg-black rounded-lg overflow-hidden aspect-square">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-white rounded-lg w-64 h-64 opacity-50" />
          </div>
          <button
            onClick={stopScanning}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Остановить
          </button>
        </div>
      )}

      {/* Кнопки управления */}
      {!isScanning && !showManualInput && (
        <div className="flex flex-col gap-2">
          <button
            onClick={startScanning}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <QrCode className="w-5 h-5" />
            Начать сканирование
          </button>
          <button
            onClick={() => setShowManualInput(true)}
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Keyboard className="w-5 h-5" />
            Ввести код вручную
          </button>
          {/* Демо-кнопка для тестирования */}
          {process.env.NODE_ENV === 'development' && (step.qrCode || step.code) && (
            <button
              onClick={handleDemoScan}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              [Демо] Автоматически отсканировать
            </button>
          )}
        </div>
      )}

      {/* Ручной ввод кода */}
      {showManualInput && !isScanning && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Введите код
            </label>
            <input
              type="text"
              value={manualCode}
              onChange={(e) => {
                setManualCode(e.target.value);
                setError(null);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleManualSubmit();
                }
              }}
              placeholder="Введите код QR"
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:outline-none"
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleManualSubmit}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Проверить
            </button>
            <button
              onClick={() => {
                setShowManualInput(false);
                setManualCode('');
                setError(null);
              }}
              className="px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Успех (временно, пока не перейдём к следующему шагу) */}
      {scannedCode && !error && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">QR-код успешно отсканирован!</p>
          </div>
        </div>
      )}
    </div>
  );
}

