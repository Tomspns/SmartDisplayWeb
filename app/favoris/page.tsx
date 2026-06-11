"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

import { apiFetch } from "@/lib/api";
import { removeFavorite } from "@/lib/favoriteApi";

type Annonce = {
  id_contenu: number;
  titre: string;
  message: string;
  type: string;
  date_debut?: string;
};

export default function FavorisPage() {

  const [favoris, setFavoris] =
    useState<Annonce[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    apiFetch<{
      favoris: Annonce[];
    }>("/favoris/details")
      .then((res) => {

        setFavoris(
          res.favoris
        );

      })
      .catch(console.error)
      .finally(() => {

        setLoading(false);

      });

  }, []);

  async function handleRemove(
    id: number
  ) {

    try {

      await removeFavorite(id);

      setFavoris((prev) =>
        prev.filter(
          (a) =>
            a.id_contenu !== id
        )
      );

    } catch (e) {

      console.error(e);

    }

  }

  function getLink(
    annonce: Annonce
  ) {

    switch (annonce.type) {

      case "actualite":
        return `/actualites/${annonce.id_contenu}`;

      case "offre":
        return `/offres/${annonce.id_contenu}`;

      case "evenement":
        return `/evenements/${annonce.id_contenu}`;

      default:
        return "/";

    }

  }

  function getBadgeTone(
    type: string
  ) {

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

    <PageLayout
      title="Mes favoris"
      subtitle="Tous vos contenus favoris"
    >

      <div className="grid gap-4">

        {loading && (

          <Card>

            Chargement...

          </Card>

        )}

        {!loading &&
          favoris.map((a) => (

            <Link
              key={a.id_contenu}
              href={getLink(a)}
            >

              <Card>

                <div
                  className="
                    flex justify-between
                    items-start gap-4
                  "
                >

                  <div className="flex-1">

                    <Badge
                      tone={
                        getBadgeTone(
                          a.type
                        ) as never
                      }
                    >
                      {a.type}
                    </Badge>

                    <h2
                      className="
                        font-bold
                        text-lg
                        mt-2
                      "
                    >
                      {a.titre}
                    </h2>

                    <p className="text-gray-600">
                      {a.message}
                    </p>

                  </div>

                  <button
                    onClick={(e) => {

                      e.preventDefault();
                      e.stopPropagation();

                      handleRemove(
                        a.id_contenu
                      );

                    }}
                    className="
                      px-3 py-2
                      rounded-xl
                      border
                      bg-white
                      text-red-600
                      hover:bg-red-50
                      hover:border-red-300
                      transition
                      shrink-0
                    "
                  >
                    ★ Retirer
                  </button>

                </div>

              </Card>

            </Link>

          ))}

        {!loading &&
          favoris.length === 0 && (

            <Card>

              Aucun favori enregistré.

            </Card>

          )}

      </div>

    </PageLayout>

  );

}