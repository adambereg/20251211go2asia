import type { Metadata } from 'next';
import { Card, CardContent } from '@go2asia/ui';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Настройки | Кабинет партнёра | Russian Friendly',
  description: 'Настройки кабинета партнёра',
};

export default function MerchantSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Настройки</h1>
        <p className="text-slate-600">Управление настройками кабинета</p>
      </div>
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <p className="text-slate-600">Раздел настроек будет доступен в следующих версиях</p>
        </CardContent>
      </Card>
    </div>
  );
}

