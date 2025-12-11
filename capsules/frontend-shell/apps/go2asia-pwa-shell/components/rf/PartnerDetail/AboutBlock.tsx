'use client';

import { Card, CardContent } from '@go2asia/ui';
import { Clock, Phone, Mail, MessageCircle, Globe, Wifi, Zap, Baby } from 'lucide-react';
import { Badge } from '@go2asia/ui';
import type { Partner } from '../types';

interface AboutBlockProps {
  partner: Partner;
}

const DAY_LABELS: Record<string, string> = {
  monday: 'Понедельник',
  tuesday: 'Вторник',
  wednesday: 'Среда',
  thursday: 'Четверг',
  friday: 'Пятница',
  saturday: 'Суббота',
  sunday: 'Воскресенье',
};

export function AboutBlock({ partner }: AboutBlockProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">О заведении</h2>
        <div className="space-y-6">
          {/* Описание */}
          <div>
            <p className="text-slate-700 leading-relaxed">{partner.description}</p>
          </div>

          {/* Часы работы */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Clock size={20} />
              Часы работы
            </h3>
            <div className="space-y-2">
              {Object.entries(partner.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="text-slate-600">{DAY_LABELS[day] || day}</span>
                  {hours.closed ? (
                    <span className="text-slate-400">Закрыто</span>
                  ) : (
                    <span className="text-slate-900 font-medium">
                      {hours.open} - {hours.close}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Контакты</h3>
            <div className="space-y-2">
              {partner.contact.phone && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone size={18} className="text-slate-400" />
                  <a href={`tel:${partner.contact.phone}`} className="hover:text-blue-600">
                    {partner.contact.phone}
                  </a>
                </div>
              )}
              {partner.contact.email && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail size={18} className="text-slate-400" />
                  <a href={`mailto:${partner.contact.email}`} className="hover:text-blue-600">
                    {partner.contact.email}
                  </a>
                </div>
              )}
              {partner.contact.telegram && (
                <div className="flex items-center gap-2 text-slate-700">
                  <MessageCircle size={18} className="text-slate-400" />
                  <a
                    href={`https://t.me/${partner.contact.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {partner.contact.telegram}
                  </a>
                </div>
              )}
              {partner.contact.website && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Globe size={18} className="text-slate-400" />
                  <a
                    href={partner.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {partner.contact.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Атрибуты */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Удобства</h3>
            <div className="flex flex-wrap gap-2">
              {partner.attributes.wifi && (
                <Badge variant="info">
                  <Wifi size={14} className="mr-1" />
                  Wi-Fi
                </Badge>
              )}
              {partner.attributes.outlets && (
                <Badge variant="info">
                  <Zap size={14} className="mr-1" />
                  Розетки
                </Badge>
              )}
              {partner.attributes.kidFriendly && (
                <Badge variant="info">
                  <Baby size={14} className="mr-1" />
                  Для детей
                </Badge>
              )}
              {partner.attributes.languages.map((lang) => (
                <Badge key={lang} variant="info">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Способы оплаты */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Способы оплаты</h3>
            <div className="flex flex-wrap gap-2">
              {partner.attributes.paymentMethods.map((method) => (
                <Badge key={method} variant="info">
                  {method === 'card' ? 'Карта' : method === 'cash' ? 'Наличные' : 'Криптовалюта'}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

