import type { Metadata } from 'next';
import { CalculatorScaffold } from '@/modules/atlas';

export const metadata: Metadata = {
  title: 'Виза-калькулятор | Atlas Asia',
  description:
    'Черновой виза-калькулятор Atlas Asia: комбинации виз по гражданству и цели визита.',
};

export default function VisaCalculatorPage() {
  return (
    <CalculatorScaffold
      type="visa"
      title="Виза-калькулятор"
      description="Структура для будущего калькулятора виз по гражданству, целям поездки и длительности пребывания."
    />
  );
}


