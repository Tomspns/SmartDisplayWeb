"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { getAnnonces, Annonce } from "@/lib/authApi";

export default function OffresPage() {
  const [offres, setOffres] = useState<Annonce[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAnnonces();
      setOffres(data.filter((a) => a.type === "alerte")); // ✅ OFFRES
    })();
  }, []);

  return (
    <PageLayout title="Offres" subtitle="Offres disponibles">
      <div className="grid gap-4">
        {offres.map((o) => (
          <Link key={o.id_contenu} href={`/actualites/${o.id_contenu}`}>
            <Card>
              <Badge tone="orange">Offre</Badge>
              <h2 className="font-bold text-lg mt-2">{o.titre}</h2>
              <p className="text-gray-600">{o.message}</p>
            </Card>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}