'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Badge } from '@go2asia/ui';
import { Plus, Edit, Archive, Percent, Gift } from 'lucide-react';
import { mockVouchers } from '../../mockData';
import type { Voucher } from '../../types';

export function VouchersListView() {
  const [vouchers] = useState<Voucher[]>(mockVouchers);
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('all');

  const filteredVouchers = vouchers.filter((v) => {
    if (filter === 'active') {
      const now = new Date();
      const expiresAt = new Date(v.expiresAt);
      return expiresAt > now && v.stats.remaining > 0;
    }
    if (filter === 'archived') {
      const now = new Date();
      const expiresAt = new Date(v.expiresAt);
      return expiresAt <= now || v.stats.remaining === 0;
    }
    return true;
  });

  const getVoucherIcon = (type: Voucher['type']) => {
    switch (type) {
      case 'discount_percent':
      case 'discount_fixed':
        return Percent;
      case 'gift':
        return Gift;
      default:
        return null;
    }
  };

  const formatVoucherValue = (voucher: Voucher) => {
    switch (voucher.type) {
      case 'discount_percent':
        return `-${voucher.value}%`;
      case 'discount_fixed':
        return `-${voucher.value} бат`;
      case 'gift':
        return voucher.title;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и действия */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Ваучеры</h1>
          <p className="text-slate-600">Управляйте специальными предложениями для клиентов</p>
        </div>
        <Button variant="primary">
          <Plus size={18} className="mr-2" />
          Создать ваучер
        </Button>
      </div>

      {/* Фильтры */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Все
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Активные
        </Button>
        <Button
          variant={filter === 'archived' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFilter('archived')}
        >
          Архивные
        </Button>
      </div>

      {/* Список ваучеров */}
      <div className="space-y-4">
        {filteredVouchers.map((voucher) => {
          const Icon = getVoucherIcon(voucher.type);
          const isActive = new Date(voucher.expiresAt) > new Date() && voucher.stats.remaining > 0;
          return (
            <Card key={voucher.id} className="border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {Icon && <Icon size={20} className="text-blue-600" />}
                      <h3 className="text-lg font-semibold text-slate-900">{voucher.title}</h3>
                      <Badge variant={isActive ? 'new' : 'info'}>{formatVoucherValue(voucher)}</Badge>
                    </div>
                    <p className="text-slate-600 mb-3">{voucher.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <span>Получено: {voucher.stats.received}</span>
                      <span>Погашено: {voucher.stats.redeemed}</span>
                      <span>Осталось: {voucher.stats.remaining}</span>
                      <span>
                        Действует до: {new Date(voucher.expiresAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Edit size={16} className="mr-1" />
                      Редактировать
                    </Button>
                    {isActive && (
                      <Button variant="secondary" size="sm">
                        <Archive size={16} className="mr-1" />
                        Архивировать
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

