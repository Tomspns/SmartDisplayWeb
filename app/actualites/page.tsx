"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import FavoriteButton from "@/components/FavoriteButton";
import ListControls, { SortKey } from "@/components/ListControls";
import { getAnnonces } from "@/lib/authApi";
import { normalize, parseFRDate } from "@/lib/sortHelpers";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

type Annonce = {
  id_contenu: number;
  titre: string;
  resume: string;
  categorie: string;
  date_publication: string;
  auteur?: string;
};

export default function ActualitesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("date_desc");
  const [lieu, setLieu] = useState("Tous");
  const lieux: string[] = [];

  const [actualites, setActualites] = useState<Annonce[]>([]);

  // 🔥 LOAD API
  useEffect(() => {
    (async () => {
      try {
        const data = await getAnnonces();
        setActualites(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);

    let list = actualites.filter((a) => {
      return (
        !q ||
        normalize(a.titre).includes(q) ||
        normalize(a.resume).includes(q) ||
        normalize(a.categorie).includes(q) ||
        normalize(a.date_publication).includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      if (sort === "date_desc")
        return parseFRDate(b.date_publication) - parseFRDate(a.date_publication);
      if (sort === "date_asc")
        return parseFRDate(a.date_publication) - parseFRDate(b.date_publication);
      if (sort === "alpha_asc") return a.titre.localeCompare(b.titre);
      if (sort === "alpha_desc") return b.titre.localeCompare(a.titre);
      return 0;
    });

    return list;
  }, [query, sort, actualites]);

  return (
    <PageLayout
      title="Actualités"
      subtitle="Informations et annonces du campus"
    >
      <Card className="p-6">
        <ListControls
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          lieux={lieux}
          lieu={lieu}
          setLieu={setLieu}
          placeholder="Rechercher une actualité..."
          showLieu={false}
        />
      </Card>

      {/* ADMIN BUTTON */}
      {user?.id_role === 1 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push("/annonces/create")}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            + Créer une annonce
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {filtered.map((a) => (
          <Link
            key={a.id_contenu}
            href={`/actualites/${a.id_contenu}`}
            className="block"
          >
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge tone="blue">{a.categorie}</Badge>
                    <Badge tone="neutral">{a.date_publication}</Badge>
                  </div>

                  <h2 className="text-xl font-extrabold">
                    {a.titre}
                  </h2>

                  <p className="mt-2 text-gray-600">{a.resume}</p>

                  <p className="mt-4 text-sm text-gray-500">
                    Publié par {a.auteur ?? "Admin"}
                  </p>
                </div>

                <FavoriteButton type="actualites" id={a.id_contenu} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}