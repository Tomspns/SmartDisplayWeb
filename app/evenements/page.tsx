"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import { getAnnonces, Annonce } from "@/lib/authApi";

import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Link from "next/link";

import FavoriteButton from "@/components/FavoriteButton";

export default function EvenementsPage() {

  const [data, setData] =
    useState<Annonce[]>([]);

  const [query, setQuery] =
    useState("");

  useEffect(() => {

    getAnnonces().then((d) =>
      setData(
        d.filter(
          (a) => a.type === "evenement"
        )
      )
    );

  }, []);

  const filtered = useMemo(() => {

    const q = query.toLowerCase();

    return data.filter((e) =>

      e.titre.toLowerCase().includes(q)

      ||

      e.message.toLowerCase().includes(q)

    );

  }, [data, query]);

  return (

    <PageLayout title="Événements">

      <Card className="p-6">

        <input
          type="text"
          placeholder="Rechercher un événement..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            px-4 py-3
          "
        />

      </Card>

      <div className="grid gap-4 mt-4">

        {filtered.map((e) => (

          <Link
            key={e.id_contenu}
            href={`/evenements/${e.id_contenu}`}
          >

            <Card>

              <div
                className="
                  flex justify-between
                  items-start gap-4
                "
              >

                <div>

                  <Badge tone="purple">
                    Événement
                  </Badge>

                  <h2 className="font-bold text-lg mt-2">
                    {e.titre}
                  </h2>

                  <p className="text-gray-600">
                    {e.message}
                  </p>

                </div>

                <div
                  onClick={(ev) =>
                    ev.stopPropagation()
                  }
                >
                  <FavoriteButton
                    id={e.id_contenu}
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