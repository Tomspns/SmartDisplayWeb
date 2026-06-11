"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import FavoriteButton from "@/components/FavoriteButton";

import {
  getAnnonces,
  Annonce
} from "@/lib/authApi";

export default function OffresPage() {

  const [data, setData] =
    useState<Annonce[]>([]);

  useEffect(() => {

    getAnnonces().then((d) =>
      setData(
        d.filter(
          (a) => a.type === "offre"
        )
      )
    );

  }, []);

  return (

    <PageLayout title="Offres">

      <div className="grid gap-4">

        {data.map((o) => (

          <Link
            key={o.id_contenu}
            href={`/offres/${o.id_contenu}`}
          >

            <Card>

              <div
                className="
                  flex justify-between
                  items-start gap-4
                "
              >

                <div className="flex-1">

                  <div className="flex gap-2 mb-2">

                    <Badge tone="orange">
                      Offre
                    </Badge>

                    <Badge tone="neutral">
                      {o.date_debut
                        ? new Date(
                            o.date_debut
                          ).toLocaleDateString()
                        : "—"}
                    </Badge>

                  </div>

                  <h2 className="font-bold text-lg">
                    {o.titre}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {o.message}
                  </p>

                </div>

                <div
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >
                  <FavoriteButton
                    id={o.id_contenu}
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