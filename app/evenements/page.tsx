"use client";

import { useEffect, useState } from "react";
import { getAnnonces, Annonce } from "@/lib/authApi";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Link from "next/link";

export default function EvenementsPage() {
  const [data, setData] = useState<Annonce[]>([]);

  useEffect(() => {
    getAnnonces().then((d) =>
      setData(d.filter((a) => a.type === "evenement"))
    );
  }, []);

  return (
    <PageLayout title="Événements">
      <div className="grid gap-4">
        {data.map((e) => (
          <Link key={e.id_contenu} href={`/actualites/${e.id_contenu}`}>
            <Card>
              <Badge tone="purple">Événement</Badge>
              <h2>{e.titre}</h2>
              <p>{e.message}</p>
            </Card>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}