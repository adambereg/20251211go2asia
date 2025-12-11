import { EmptyStateAtlas } from '@/modules/atlas';

export default function CityTipsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Практическая информация</h2>
      <EmptyStateAtlas
        title="Полезные советы"
        description="Безопасность, нормы поведения, где менять деньги, интернет / SIM / eSIM, опасности (мошенники, такси, вода, дороги)."
      />
    </div>
  );
}

