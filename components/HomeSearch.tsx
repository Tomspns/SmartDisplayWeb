"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { offres, actualites, evenements } from "@/data/mock";
import { normalize, parseFRDate } from "@/lib/sortHelpers";

type Scope = "tout" | "offres" | "actualites" | "evenements";
type Sort = "pertinence" | "date_desc" | "alpha_asc";

export default function HomeSearch() {
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<Scope>("tout");
  const [sort, setSort] = useState<Sort>("pertinence");

  const results = useMemo(() => {
    const query = normalize(q);
    if (!query) return [];

    const inOffres =
      scope === "tout" || scope === "offres"
        ? offres
            .map((o) => ({
              kind: "offres" as const,
              id: o.id,
              title: o.titre,
              subtitle: `${o.entreprise} • ${o.lieu}`,
              date: "", // offres: pas de date dans ton mock
              text: `${o.titre} ${o.entreprise} ${o.lieu} ${o.description} ${o.tags.join(" ")}`,
              href: `/offres/${o.id}`,
            }))
        : [];

    const inActus =
      scope === "tout" || scope === "actualites"
        ? actualites.map((a) => ({
            kind: "actualites" as const,
            id: a.id,
            title: a.titre,
            subtitle: `${a.categorie} • ${a.auteur}`,
            date: a.date,
            text: `${a.titre} ${a.resume} ${a.categorie} ${a.auteur} ${a.date}`,
            href: `/actualites/${a.id}`,
          }))
        : [];

    const inEvents =
      scope === "tout" || scope === "evenements"
        ? evenements.map((e) => ({
            kind: "evenements" as const,
            id: e.id,
            title: e.titre,
            subtitle: `${e.lieu} • ${e.heure}`,
            date: e.date,
            text: `${e.titre} ${e.resume} ${e.lieu} ${e.type} ${e.date} ${e.heure}`,
            href: `/evenements/${e.id}`,
          }))
        : [];

    const all = [...inOffres, ...inActus, ...inEvents]
      .filter((x) => normalize(x.text).includes(query))
      .slice(0, 20);

    if (sort === "alpha_asc") {
      return [...all].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "date_desc") {
      return [...all].sort((a, b) => parseFRDate(b.date) - parseFRDate(a.date));
    }
    // pertinence simple = ordre naturel filtré (ok pour une démo)
    return all;
  }, [q, scope, sort]);

  return (
    <Card className="p-6 md:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-extrabold tracking-tight">Recherche</h2>
          <p className="text-sm text-gray-600 mt-1">
            Trouve rapidement une offre, un événement ou une actualité.
          </p>
        </div>

        <div className="flex gap-2">
          <select className="input md:w-48" value={scope} onChange={(e) => setScope(e.target.value as Scope)}>
            <option value="tout">Tout</option>
            <option value="offres">Offres</option>
            <option value="actualites">Actualités</option>
            <option value="evenements">Événements</option>
          </select>

          <select className="input md:w-56" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="pertinence">Tri : pertinence</option>
            <option value="date_desc">Tri : date (récent)</option>
            <option value="alpha_asc">Tri : A → Z</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <input
          className="input"
          placeholder="Ex : alternance, hackathon, Annecy, forum, cybersécurité…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {q.trim() && (
        <div className="mt-4 space-y-2">
          {results.length === 0 ? (
            <div className="text-sm text-gray-600">Aucun résultat.</div>
          ) : (
            results.slice(0, 6).map((r) => (
              <Link key={`${r.kind}-${r.id}`} href={r.href} className="block">
                <div className="rounded-2xl border border-white/60 bg-white/60 p-4 hover:bg-white transition">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-bold">{r.title}</div>
                    <Badge tone={r.kind === "offres" ? "orange" : r.kind === "evenements" ? "green" : "blue"}>
                      {r.kind}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{r.subtitle}</div>
                  {r.date ? <div className="text-xs text-gray-500 mt-2">Date : {r.date}</div> : null}
                </div>
              </Link>
            ))
          )}

          {results.length > 6 ? (
            <div className="text-xs text-gray-500">
              {results.length} résultats trouvés (affichage des 6 premiers).
            </div>
          ) : null}
        </div>
      )}
    </Card>
  );
}
