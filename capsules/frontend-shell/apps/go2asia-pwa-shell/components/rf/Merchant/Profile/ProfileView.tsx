'use client';

import { Card, CardContent, Button, Badge } from '@go2asia/ui';
import { Edit, Save, X } from 'lucide-react';
import { useState } from 'react';
import { mockPartners } from '../../mockData';
import type { Partner } from '../../types';
import { PARTNER_CATEGORY_LABELS } from '../../types';

export function ProfileView() {
  const [partner] = useState<Partner>(mockPartners[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: partner.name,
    description: partner.description,
    phone: partner.contact.phone || '',
    email: partner.contact.email || '',
    telegram: partner.contact.telegram || '',
    website: partner.contact.website || '',
  });

  const handleSave = () => {
    // Заглушка: в реальном приложении здесь будет сохранение данных
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: partner.name,
      description: partner.description,
      phone: partner.contact.phone || '',
      email: partner.contact.email || '',
      telegram: partner.contact.telegram || '',
      website: partner.contact.website || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Профиль заведения</h1>
          <p className="text-slate-600">Управляйте информацией о вашем заведении</p>
        </div>
        {!isEditing ? (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            <Edit size={18} className="mr-2" />
            Редактировать
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              <X size={18} className="mr-2" />
              Отмена
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <Save size={18} className="mr-2" />
              Сохранить
            </Button>
          </div>
        )}
      </div>

      {/* Основная информация */}
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Основная информация</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Название</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-slate-900 font-medium">{partner.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Категория</label>
              <Badge variant="info">{PARTNER_CATEGORY_LABELS[partner.category]}</Badge>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Описание</label>
              {isEditing ? (
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-slate-700">{partner.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Контакты */}
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Контакты</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Телефон</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-slate-700">{partner.contact.phone || '—'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-slate-700">{partner.contact.email || '—'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Telegram</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-slate-700">{partner.contact.telegram || '—'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Веб-сайт</label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-slate-700">{partner.contact.website || '—'}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Адрес */}
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Адрес</h3>
          <div className="space-y-2">
            <p className="text-slate-700">{partner.address.fullAddress}</p>
            <p className="text-slate-600 text-sm">
              {partner.address.district && `${partner.address.district}, `}
              {partner.address.city}, {partner.address.country}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

