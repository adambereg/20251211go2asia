'use client';

import { useState, useEffect } from 'react';
import { Button } from '@go2asia/ui';
import { X, Copy, Share2, QrCode } from 'lucide-react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralLink: string;
  referralQR?: string;
}

export function InviteModal({ isOpen, onClose, referralLink, referralQR }: InviteModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Присоединяйся к Go2Asia',
        text: 'Присоединяйся к Go2Asia и получай награды!',
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };

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
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">Пригласить друга</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Реферальная ссылка */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Реферальная ссылка
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50"
              />
              <Button variant="secondary" onClick={handleCopy} size="sm">
                <Copy size={16} />
                {copied ? 'Скопировано!' : 'Копировать'}
              </Button>
            </div>
          </div>

          {/* QR код (если есть) */}
          {referralQR && (
            <div className="text-center">
              <div className="inline-block p-4 bg-white border-2 border-slate-200 rounded-lg">
                <QrCode className="w-32 h-32 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 mt-2">QR-код для приглашения</p>
            </div>
          )}

          {/* Миссии реферала */}
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium text-slate-700 mb-2">Миссии реферала:</p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Завершить 1 квест</li>
              <li>• Оставить отзыв в RF</li>
              <li>• Опубликовать пост в Space</li>
            </ul>
          </div>

          {/* Кнопки шаринга */}
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleShare} className="flex-1">
              <Share2 size={16} className="mr-2" />
              Поделиться
            </Button>
            <Button variant="primary" onClick={onClose} className="flex-1">
              Готово
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

