"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import FavoriteButton from "@/components/FavoriteButton";
import ListControls, { SortKey } from "@/components/ListControls";
import { offres } from "@/data/mock";
import { normalize } from "@/lib/sortHelpers";

export default function OffresPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"Toutes" | "Stage" | "Alternance">("Toutes");

  const [sort, setSort] = useState<SortKey>("alpha_asc");
  const [lieu, setLieu] = useState("Tous");

  const lieux = useMemo(() => {
    return Array.from(new Set(offres.map((o) => o.lieu))).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);

    let list = offres.filter((o) => {
      const matchesType = typeFilter === "Toutes" || o.type === typeFilter;
      const matchesLieu = lieu === "Tous" || o.lieu === lieu;
      const matchesQuery =
        !q ||
        normalize(o.titre).includes(q) ||
        normalize(o.entreprise).includes(q) ||
        normalize(o.lieu).includes(q) ||
        normalize(o.description).includes(q) ||
        normalize(o.tags.join(" ")).includes(q);

      return matchesType && matchesLieu && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      if (sort === "alpha_asc") return a.titre.localeCompare(b.titre);
      if (sort === "alpha_desc") return b.titre.localeCompare(a.titre);
      if (sort === "lieu_asc") return a.lieu.localeCompare(b.lieu);
      if (sort === "lieu_desc") return b.lieu.localeCompare(a.lieu);
      // offres : pas de date → fallback alpha
      return a.titre.localeCompare(b.titre);
    });

    return list;
  }, [query, typeFilter, sort, lieu]);

  return (
    <PageLayout title="Offres" subtitle="Stages, alternances et opportunités" right={<Badge tone="purple">{filtered.length} résultat(s)</Badge>}>
      <Card className="p-6 space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {(["Toutes", "Stage", "Alternance"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={[
                  "px-4 py-2 rounded-2xl text-sm font-semibold border transition active:scale-[0.98]",
                  typeFilter === t
                    ? "text-white bg-linear-to-br from-blue-600 to-purple-600 border-transparent"
                    : "bg-white/70 border-white/70 hover:bg-white",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <ListControls
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          lieux={lieux}
          lieu={lieu}
          setLieu={setLieu}
          placeholder="Rechercher une offre (poste, entreprise, tags...)"
          showLieu
        />
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((o) => (
          <Link key={o.id} href={`/offres/${o.id}`} className="block">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge tone={o.type === "Stage" ? "orange" : "green"}>{o.type}</Badge>
                  <Badge tone="neutral">{o.lieu}</Badge>
                  <Badge tone="blue">{o.entreprise}</Badge>
                </div>
                <FavoriteButton type="offres" id={o.id} />
              </div>

              <h2 className="text-xl font-extrabold tracking-tight">{o.titre}</h2>
              <p className="mt-2 text-gray-600">{o.description}</p>
              <p className="mt-4 text-sm text-gray-500">Durée : {o.duree}</p>
            </Card>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
