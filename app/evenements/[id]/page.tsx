import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { apiFetch } from "@/lib/api";
import { Annonce } from "@/lib/authApi";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

type Params = {
  id: string;
};

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {

  const p = await params;

  const id = Number(p.id);

  if (!id) return notFound();

  let annonce: Annonce;

  try {

    annonce = await apiFetch(`/annonces/${id}`);

  } catch {

    return notFound();

  }

  if (annonce.type !== "evenement") {
    return notFound();
  }

  return (
    <PageLayout
      title={annonce.titre}
      subtitle={`Publié le ${new Date(
        annonce.date_debut
      ).toLocaleDateString()}`}
      right={<Badge tone="purple">Événement</Badge>}
    >

      <div className="mb-6 flex items-center justify-between">

        <div>

          <Link
            href="/evenements"
            className="text-sm text-purple-600 hover:underline"
          >
            ← Retour aux événements
          </Link>

          {annonce.nom && (
            <p className="mt-2 text-sm text-gray-500">
              Par {annonce.prenom} {annonce.nom}
            </p>
          )}

        </div>

        <DeleteButton id={annonce.id_contenu} />

      </div>

      <Card className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl md:p-8">

        <p className="whitespace-pre-line text-lg leading-relaxed text-gray-700">
          {annonce.message}
        </p>

      </Card>

    </PageLayout>
  );
}