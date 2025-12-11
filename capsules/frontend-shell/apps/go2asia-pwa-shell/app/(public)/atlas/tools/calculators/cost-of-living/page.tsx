import type { Metadata } from 'next';
import { CalculatorScaffold } from '@/modules/atlas';

export const metadata: Metadata = {
  title: 'Калькулятор стоимости жизни | Atlas Asia',
  description:
    'Черновой калькулятор стоимости месяца жизни в городах Юго-Восточной Азии.',
};

export default function CostOfLivingCalculatorPage() {
  return (
    <CalculatorScaffold
      type="cost-of-living"
      title="Калькулятор стоимости жизни"
      description="Оцените бюджет на месяц жизни с учётом города, района, типа жилья и стиля жизни."
    />
  );
}


