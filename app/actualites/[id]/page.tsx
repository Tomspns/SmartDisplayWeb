import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { apiFetch } from "@/lib/api";
import { Annonce } from "@/lib/authApi";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (!id) return notFound();

  let annonce: Annonce;

  try {
    annonce = await apiFetch(`/annonces/${id}`);
  } catch {
    return notFound();
  }

  return (
    <PageLayout
      title={annonce.titre}
      subtitle={`Publié le ${new Date(annonce.date_debut).toLocaleDateString()}`}
      right={<Badge tone="blue">{annonce.type}</Badge>}
    >
      <Card>
        <p>{annonce.message}</p>
      </Card>
    </PageLayout>
  );
}