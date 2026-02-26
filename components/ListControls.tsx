"use client";

export type SortKey = "date_desc" | "date_asc" | "alpha_asc" | "alpha_desc" | "lieu_asc" | "lieu_desc";

export default function ListControls({
  query,
  setQuery,
  sort,
  setSort,
  lieux,
  lieu,
  setLieu,
  placeholder = "Rechercher...",
  showLieu = true,
}: {
  query: string;
  setQuery: (v: string) => void;

  sort: SortKey;
  setSort: (v: SortKey) => void;

  lieux: string[];
  lieu: string;
  setLieu: (v: string) => void;

  placeholder?: string;
  showLieu?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <input
        className="input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {showLieu ? (
          <select className="input md:w-56" value={lieu} onChange={(e) => setLieu(e.target.value)}>
            <option value="Tous">Tous les lieux</option>
            {lieux.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        ) : null}

        <select className="input md:w-64" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          <option value="date_desc">Date (plus récent → plus ancien)</option>
          <option value="date_asc">Date (plus ancien → plus récent)</option>
          <option value="alpha_asc">Alphabetique (A → Z)</option>
          <option value="alpha_desc">Alphabetique (Z → A)</option>
          <option value="lieu_asc">Lieu (A → Z)</option>
          <option value="lieu_desc">Lieu (Z → A)</option>
        </select>
      </div>
    </div>
  );
}
