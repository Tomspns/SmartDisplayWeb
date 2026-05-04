import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { apiFetch } from "@/lib/api";
import { Annonce } from "@/lib/authApi";

type Params = { id: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const p = await params; // ✅ FIX Next.js 16
  const id = Number(p.id);

  if (!id) return notFound();

  let annonce: Annonce;

  try {
    annonce = await apiFetch(`/annonces/${id}`);
  } catch {
    return notFound();
  }

  // ✅ sécurité : uniquement actualités
  if (annonce.type !== "info") return notFound();

  return (
    <PageLayout
      title={annonce.titre}
      subtitle={`Publié le ${new Date(annonce.date_debut).toLocaleDateString()}`}
      right={<Badge tone="blue">Actualité</Badge>}
    >
      <Card>
        <p>{annonce.message}</p>
      </Card>
    </PageLayout>
  );
}