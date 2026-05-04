"use client";

import { useEffect, useState } from "react";
import { getAnnonces, Annonce } from "@/lib/authApi";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Link from "next/link";

export default function OffresPage() {
  const [data, setData] = useState<Annonce[]>([]);

  useEffect(() => {
    getAnnonces().then((d) =>
      setData(d.filter((a) => a.type === "alerte"))
    );
  }, []);

  return (
    <PageLayout title="Offres">
      <div className="grid gap-4">
        {data.map((o) => (
          <Link key={o.id_contenu} href={`/offres/${o.id_contenu}`}>
            <Card>
              <Badge tone="orange">Offre</Badge>
              <h2>{o.titre}</h2>
              <p>{o.message}</p>
            </Card>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}