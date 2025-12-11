export interface EmptyStateAtlasProps {
  title: string;
  description: string;
}

export function EmptyStateAtlas({ title, description }: EmptyStateAtlasProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center">
      <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 max-w-xl mx-auto">{description}</p>
    </div>
  );
}

export default EmptyStateAtlas;


