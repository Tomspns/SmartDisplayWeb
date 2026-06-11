"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

import { apiFetch } from "@/lib/api";

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

  useEffect(() => {

    apiFetch<{
      favoris: Annonce[];
    }>("/favoris/details")
      .then((res) => {

        setFavoris(
          res.favoris
        );

      })
      .catch(console.error);

  }, []);

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

  return (

    <PageLayout
      title="Mes favoris"
      subtitle="Tous vos contenus favoris"
    >

      <div className="grid gap-4">

        {favoris.map((a) => (

          <Link
            key={a.id_contenu}
            href={getLink(a)}
          >

            <Card>

              <Badge>

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

            </Card>

          </Link>

        ))}

        {favoris.length === 0 && (

          <Card>

            Aucun favori enregistré.

          </Card>

        )}

      </div>

    </PageLayout>

  );

}