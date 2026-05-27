"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Card from "@/components/Card";
import Badge from "@/components/Badge";

import { apiFetch } from "@/lib/api";

type Contenu = {
  id_contenu: number;
  titre: string;
  message: string;
  type: string;
};

export default function HomeSearch() {

  const [query, setQuery] =
    useState("");

  const [contenus, setContenus] =
    useState<Contenu[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await apiFetch<Contenu[]>("/annonces");

        setContenus(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  const results = useMemo(() => {

    if (!query.trim()) {
      return [];
    }

    const q = query.toLowerCase();

    return contenus
      .filter((c) => {

        return (
          c.titre.toLowerCase().includes(q)
          ||
          c.message.toLowerCase().includes(q)
          ||
          c.type.toLowerCase().includes(q)
        );

      })
      .slice(0, 6);

  }, [query, contenus]);

  function getLink(item: Contenu) {

    switch (item.type) {

      case "actualite":
        return `/actualites/${item.id_contenu}`;

      case "offre":
        return `/offres/${item.id_contenu}`;

      case "evenement":
        return `/evenements/${item.id_contenu}`;

      default:
        return "/";

    }

  }

  function getBadgeTone(type: string) {

    switch (type) {

      case "actualite":
        return "blue";

      case "offre":
        return "orange";

      case "evenement":
        return "green";

      default:
        return "neutral";

    }

  }

  return (

    <Card className="p-6 relative z-50 overflow-visible">

      <div className="flex flex-col gap-4">

        <div>

          <h2 className="text-2xl font-extrabold tracking-tight">
            Recherche rapide
          </h2>

          <p className="mt-1 text-gray-600">
            Rechercher une actualité,
            une offre ou un événement.
          </p>

        </div>

        <div className="relative overflow-visible">

          <input
            type="text"
            placeholder="Rechercher..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="
              w-full rounded-2xl
              border border-gray-200
              bg-white px-5 py-4
              text-sm outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

          {/* RESULTS */}

          {query.trim() && (

            <div
              className="
                absolute left-0 top-full
                z-9999
                mt-3 w-full
                rounded-3xl border
                border-gray-100
                bg-white shadow-2xl
                overflow-hidden
              "
            >

              {loading ? (

                <div className="p-5 text-gray-500">
                  Chargement...
                </div>

              ) : results.length > 0 ? (

                <div className="divide-y">

                  {results.map((item) => (

                    <Link
                      key={item.id_contenu}
                      href={getLink(item)}
                      className="
                        block p-5
                        hover:bg-gray-50
                        transition
                        cursor-pointer
                      "
                    >

                      <div className="flex items-center gap-3">

                        <Badge
                          tone={
                            getBadgeTone(item.type) as never
                          }
                        >
                          {item.type}
                        </Badge>

                        <div className="font-bold">
                          {item.titre}
                        </div>

                      </div>

                      <div
                        className="
                          mt-2 text-sm
                          text-gray-600
                          line-clamp-2
                        "
                      >
                        {item.message}
                      </div>

                    </Link>

                  ))}

                </div>

              ) : (

                <div className="p-5 text-gray-500">

                  Aucun résultat.

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </Card>

  );

}