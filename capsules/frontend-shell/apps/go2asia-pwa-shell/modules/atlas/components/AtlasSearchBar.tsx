export interface AtlasSearchBarProps {
  placeholder?: string;
}

export function AtlasSearchBar({
  placeholder = 'Страна, город, городок, места, гайды...',
}: AtlasSearchBarProps) {
  return (
    <div className="mb-6">
      <label className="sr-only" htmlFor="atlas-search">
        Поиск по Atlas Asia
      </label>
      <input
        id="atlas-search"
        type="search"
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}

export default AtlasSearchBar;


