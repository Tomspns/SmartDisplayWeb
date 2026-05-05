import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { apiFetch } from "@/lib/api";
import { Annonce } from "@/lib/authApi";
import Link from "next/link";

type Params = { id: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const p = await params;
  const id = Number(p.id);

  if (!id) return notFound();

  let annonce: Annonce;

  try {
    annonce = await apiFetch(`/annonces/${id}`);
  } catch {
    return notFound();
  }

  if (annonce.type !== "info") return notFound();

  return (
    <PageLayout
      title={annonce.titre}
      subtitle={`Publié le ${new Date(annonce.date_debut).toLocaleDateString()}`}
      right={<Badge tone="blue">Actualité</Badge>}
    >
      <div className="mb-6">
        <Link href="/actualites" className="text-sm text-blue-600 hover:underline">
          ← Retour aux actualités
        </Link>

        {annonce.nom && (
          <p className="text-sm text-gray-500 mt-2">
            Par {annonce.prenom} {annonce.nom}
          </p>
        )}
      </div>

      <Card className="p-6 md:p-8 bg-white shadow-xl rounded-2xl">
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {annonce.message}
        </p>
      </Card>
    </PageLayout>
  );
}