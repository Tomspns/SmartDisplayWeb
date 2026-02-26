"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import FavoriteButton from "@/components/FavoriteButton";
import ListControls, { SortKey } from "@/components/ListControls";
import { actualites } from "@/data/mock";
import { normalize, parseFRDate } from "@/lib/sortHelpers";

export default function ActualitesPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("date_desc");

  // actus n’ont pas “lieu” → on désactive
  const lieux: string[] = [];
  const [lieu, setLieu] = useState("Tous");

  const filtered = useMemo(() => {
    const q = normalize(query);

    let list = actualites.filter((a) => {
      const matchesQuery =
        !q ||
        normalize(a.titre).includes(q) ||
        normalize(a.resume).includes(q) ||
        normalize(a.categorie).includes(q) ||
        normalize(a.auteur).includes(q) ||
        normalize(a.date).includes(q);
      return matchesQuery;
    });

    list = [...list].sort((a, b) => {
      if (sort === "date_desc") return parseFRDate(b.date) - parseFRDate(a.date);
      if (sort === "date_asc") return parseFRDate(a.date) - parseFRDate(b.date);
      if (sort === "alpha_asc") return a.titre.localeCompare(b.titre);
      if (sort === "alpha_desc") return b.titre.localeCompare(a.titre);
      return 0;
    });

    return list;
  }, [query, sort]);

  return (
    <PageLayout title="Actualités" subtitle="Informations et annonces du campus">
      <Card className="p-6">
        <ListControls
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          lieux={lieux}
          lieu={lieu}
          setLieu={setLieu}
          placeholder="Rechercher une actualité (titre, catégorie, auteur...)"
          showLieu={false}
        />
      </Card>

      <div className="grid gap-4">
        {filtered.map((a) => (
          <Link key={a.id} href={`/actualites/${a.id}`} className="block">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge tone="blue">{a.categorie}</Badge>
                    <Badge tone="neutral">{a.date}</Badge>
                  </div>

                  <h2 className="text-xl font-extrabold tracking-tight">{a.titre}</h2>
                  <p className="mt-2 text-gray-600">{a.resume}</p>
                  <p className="mt-4 text-sm text-gray-500">Publié par {a.auteur}</p>
                </div>

                <FavoriteButton type="actualites" id={a.id} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
