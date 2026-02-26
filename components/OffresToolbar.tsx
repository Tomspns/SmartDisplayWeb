"use client";

import Button from "@/components/Button";

export default function OffresToolbar({
  query,
  setQuery,
  filter,
  setFilter,
}: {
  query: string;
  setQuery: (v: string) => void;
  filter: "Toutes" | "Stage" | "Alternance";
  setFilter: (v: "Toutes" | "Stage" | "Alternance") => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher une offre (ex: Next.js, réseau, data...)"
        className="w-full md:max-w-xl rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm
                   outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-2">
        <Button variant={filter === "Toutes" ? "primary" : "secondary"} onClick={() => setFilter("Toutes")}>
          Toutes
        </Button>
        <Button variant={filter === "Stage" ? "primary" : "secondary"} onClick={() => setFilter("Stage")}>
          Stage
        </Button>
        <Button variant={filter === "Alternance" ? "primary" : "secondary"} onClick={() => setFilter("Alternance")}>
          Alternance
        </Button>
      </div>
    </div>
  );
}
