"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  useEffect
} from "react";

import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import FavoriteButton from "@/components/FavoriteButton";
import ListControls, {
  SortKey
} from "@/components/ListControls";

import {
  getAnnonces,
  Annonce
} from "@/lib/authApi";

import {
  normalize,
  parseDateSafe
} from "@/lib/sortHelpers";

import { useAuth } from "@/lib/AuthContext";

import { useRouter } from "next/navigation";

export default function ActualitesPage() {

  const { user } = useAuth();

  const router = useRouter();

  const [query, setQuery] =
    useState("");

  const [sort, setSort] =
    useState<SortKey>("date_desc");

  const [actualites, setActualites] =
    useState<Annonce[]>([]);

  useEffect(() => {

    getAnnonces()
      .then(setActualites)
      .catch(console.error);

  }, []);

  const filtered = useMemo(() => {

    const q = normalize(query);

    const list = actualites

      .filter(
        (a) => a.type === "actualite"
      )

      .filter((a) =>

        !q ||

        normalize(a.titre).includes(q)

        ||

        normalize(a.message).includes(q)

      );

    list.sort((a, b) => {

      if (sort === "date_desc") {

        return (
          parseDateSafe(b.date_debut)
          -
          parseDateSafe(a.date_debut)
        );

      }

      if (sort === "date_asc") {

        return (
          parseDateSafe(a.date_debut)
          -
          parseDateSafe(b.date_debut)
        );

      }

      if (sort === "alpha_asc") {

        return a.titre.localeCompare(
          b.titre
        );

      }

      if (sort === "alpha_desc") {

        return b.titre.localeCompare(
          a.titre
        );

      }

      return 0;

    });

    return list;

  }, [query, sort, actualites]);

  return (

    <PageLayout
      title="Actualités"
      subtitle="Informations du campus"
    >

      <Card className="p-6">

        <ListControls
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          lieux={[]}
          lieu=""
          setLieu={() => {}}
          showLieu={false}
        />

      </Card>

      {/* ADMIN */}

      {user?.id_role === 3 && (

        <div className="flex justify-end mb-4">

          <button
            onClick={() =>
              router.push(
                "/annonces/create"
              )
            }
            className="
              px-4 py-2
              bg-blue-600
              text-white
              rounded-xl
              hover:bg-blue-700
            "
          >
            + Créer une annonce
          </button>

        </div>

      )}

      {/* LISTE */}

      <div className="grid gap-4">

        {filtered.map((a) => (

          <Link
            key={a.id_contenu}
            href={`/actualites/${a.id_contenu}`}
            className="block"
          >

            <Card>

              <div
                className="
                  flex justify-between
                  items-start gap-4
                "
              >

                <div>

                  <div className="flex gap-2 mb-2">

                    <Badge tone="blue">
                      Actualité
                    </Badge>

                    <Badge tone="neutral">

                      {a.date_debut
                        ? new Date(
                            a.date_debut
                          ).toLocaleDateString()
                        : "—"}

                    </Badge>

                  </div>

                  <h2
                    className="
                      font-bold
                      text-lg
                    "
                  >
                    {a.titre}
                  </h2>

                  <p className="text-gray-600">
                    {a.message}
                  </p>

                </div>

                <div
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >

                  <FavoriteButton
                    type="actualites"
                    id={a.id_contenu}
                  />

                </div>

              </div>

            </Card>

          </Link>

        ))}

      </div>

    </PageLayout>

  );

}