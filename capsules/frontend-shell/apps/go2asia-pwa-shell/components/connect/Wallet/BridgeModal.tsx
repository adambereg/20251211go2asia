'use client';

import { useState, useEffect } from 'react';
import { Button } from '@go2asia/ui';
import { AlertCircle, Info, X } from 'lucide-react';

interface BridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'topup' | 'withdraw';
  currentBalance: number;
}

export function BridgeModal({ isOpen, onClose, mode, currentBalance }: BridgeModalProps) {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Сброс формы при закрытии
  useEffect(() => {
    if (!isOpen) {
      setAmount('');
      setIsProcessing(false);
    }
  }, [isOpen]);

  // Mock расчёт комиссии
  const fee = mode === 'withdraw' ? 0.05 : 0.02; // 5% для вывода, 2% для пополнения
  const calculatedFee = amount ? parseFloat(amount) * fee : 0;
  const finalAmount = amount
    ? mode === 'withdraw'
      ? parseFloat(amount) - calculatedFee
      : parseFloat(amount) - calculatedFee
    : 0;

  const handleSubmit = () => {
    setIsProcessing(true);
    // Mock обработка
    setTimeout(() => {
      setIsProcessing(false);
      // Показываем toast (будет реализовано позже)
      alert(
        mode === 'topup'
          ? `Пополнение на ${amount} G2A обрабатывается`
          : `Вывод ${amount} G2A обрабатывается`
      );
      onClose();
      setAmount('');
    }, 1000);
  };

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">
            {mode === 'topup' ? 'Пополнить G2A' : 'Вывести G2A'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Контент */}
        <div className="space-y-4">
        {/* Информация */}
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-slate-600 mt-0.5" />
            <div className="text-sm text-slate-600">
              {mode === 'topup' ? (
                <p>
                  Пополнение G2A токенов через Blockchain Gateway. Токены будут доступны после подтверждения транзакции в блокчейне.
                </p>
              ) : (
                <p>
                  Вывод G2A токенов в блокчейн. Обратите внимание на комиссию и время обработки транзакции.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Текущий баланс */}
        <div>
          <label className="text-sm font-medium text-slate-700">Текущий баланс</label>
          <p className="text-2xl font-bold text-slate-900 mt-1">{currentBalance.toLocaleString()} G2A</p>
        </div>

        {/* Сумма */}
        <div>
          <label htmlFor="amount" className="text-sm font-medium text-slate-700 mb-2 block">
            Сумма (G2A)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          />
        </div>

        {/* Комиссия */}
        {amount && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Комиссия ({fee * 100}%)</span>
              <span className="text-slate-900 font-medium">{calculatedFee.toFixed(2)} G2A</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-slate-900">
                {mode === 'topup' ? 'К зачислению' : 'К получению'}
              </span>
              <span className="text-slate-900">{finalAmount.toFixed(2)} G2A</span>
            </div>
          </div>
        )}

        {/* Предупреждение для вывода */}
        {mode === 'withdraw' && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Внимание!</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Комиссия сети может варьироваться в зависимости от загрузки блокчейна</li>
                  <li>Время обработки транзакции: от 5 до 30 минут</li>
                  <li>Убедитесь, что адрес кошелька корректен</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Кнопки */}
        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
            className="flex-1"
          >
            {isProcessing ? 'Обработка...' : mode === 'topup' ? 'Пополнить' : 'Вывести'}
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
