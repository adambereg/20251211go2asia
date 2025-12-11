'use client';

import { Card, CardContent, Button, Badge } from '@go2asia/ui';
import { CheckSquare, Clock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { mockVerifications, mockPartners } from '../../mockData';
import { VerifiedBadge } from '../../Shared';

export function VerificationsListView() {
  const [verifications] = useState(mockVerifications);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="info" className="bg-green-100 text-green-700">Одобрено</Badge>;
      case 'rejected':
        return <Badge variant="info" className="bg-red-100 text-red-700">Отклонено</Badge>;
      default:
        return <Badge variant="info" className="bg-amber-100 text-amber-700">В процессе</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Проверки</h1>
        <p className="text-slate-600">
          Проводите проверки партнёров по стандарту Russian Friendly
        </p>
      </div>

      {/* Список проверок */}
      <div className="space-y-3">
        {verifications.map((verification) => {
          const partner = mockPartners.find((p) => p.id === verification.partnerId);
          if (!partner) return null;

          return (
            <Card key={verification.id} className="border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link href={`/rf/${partner.id}`}>
                        <h3 className="font-semibold text-slate-900 hover:text-purple-600">
                          {partner.name}
                        </h3>
                      </Link>
                      {getStatusBadge(verification.status)}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{verification.notes}</p>
                    <div className="text-xs text-slate-500">
                      Создана: {new Date(verification.createdAt).toLocaleDateString('ru-RU')}
                      {verification.completedAt && (
                        <> • Завершена: {new Date(verification.completedAt).toLocaleDateString('ru-RU')}</>
                      )}
                    </div>
                  </div>
                  {verification.status === 'pending' && (
                    <Link href={`/rf/pro/verifications/${verification.id}`}>
                      <Button variant="primary" size="sm">
                        <CheckSquare size={16} className="mr-2" />
                        Провести проверку
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Чек-лист */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Чек-лист</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {verification.checklist.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        {item.status ? (
                          <CheckCircle2 size={16} className="text-green-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                        )}
                        <span className={`text-sm ${item.status ? 'text-slate-900' : 'text-slate-500'}`}>
                          {item.requirement}
                        </span>
                      </div>
                    ))}
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

