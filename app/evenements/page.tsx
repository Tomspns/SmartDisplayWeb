"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import FavoriteButton from "@/components/FavoriteButton";
import ListControls, { SortKey } from "@/components/ListControls";
import { evenements } from "@/data/mock";
import { normalize, parseFRDate } from "@/lib/sortHelpers";

type BadgeTone = "neutral" | "blue" | "purple" | "green" | "orange";
function toneFor(type: string): BadgeTone {
  if (type === "Tech") return "purple";
  if (type === "Carrière") return "blue";
  return "green";
}

export default function EvenementsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("date_desc");
  const [lieu, setLieu] = useState("Tous");

  const lieux = useMemo(() => {
    return Array.from(new Set(evenements.map((e) => e.lieu))).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);

    let list = evenements.filter((e) => {
      const matchesLieu = lieu === "Tous" || e.lieu === lieu;
      const matchesQuery =
        !q ||
        normalize(e.titre).includes(q) ||
        normalize(e.resume).includes(q) ||
        normalize(e.type).includes(q) ||
        normalize(e.lieu).includes(q) ||
        normalize(e.date).includes(q);

      return matchesLieu && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      if (sort === "date_desc") return parseFRDate(b.date) - parseFRDate(a.date);
      if (sort === "date_asc") return parseFRDate(a.date) - parseFRDate(b.date);
      if (sort === "alpha_asc") return a.titre.localeCompare(b.titre);
      if (sort === "alpha_desc") return b.titre.localeCompare(a.titre);
      if (sort === "lieu_asc") return a.lieu.localeCompare(b.lieu);
      if (sort === "lieu_desc") return b.lieu.localeCompare(a.lieu);
      return 0;
    });

    return list;
  }, [query, sort, lieu]);

  return (
    <PageLayout title="Événements" subtitle="Agenda et temps forts du campus">
      <Card className="p-6">
        <ListControls
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          lieux={lieux}
          lieu={lieu}
          setLieu={setLieu}
          placeholder="Rechercher un événement (titre, type, lieu...)"
          showLieu
        />
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((e) => (
          <Link key={e.id} href={`/evenements/${e.id}`} className="block">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge tone={toneFor(e.type)}>{e.type}</Badge>
                    <Badge tone="neutral">{e.date}</Badge>
                    <Badge tone="neutral">{e.heure}</Badge>
                    <Badge tone="neutral">{e.lieu}</Badge>
                  </div>

                  <h2 className="text-xl font-extrabold tracking-tight">{e.titre}</h2>
                  <p className="mt-2 text-gray-600">{e.resume}</p>
                </div>

                <FavoriteButton type="evenements" id={e.id} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
