import { notFound } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { actualites } from "@/data/mock";

type Params = { id: string };
type Props = { params: Params | Promise<Params> };

export default async function ActualiteDetailsPage({ params }: Props) {
  const p = await params;
  const id = Number(p.id);
  const actualite = actualites.find((a) => a.id === id);

  if (!actualite) return notFound();

  return (
    <PageLayout
      title={actualite.titre}
      subtitle={`Publié le ${actualite.date} • par ${actualite.auteur}`}
      right={<Badge tone="blue">{actualite.categorie}</Badge>}
    >
      <Card className="space-y-4">
        <p className="text-gray-600">{actualite.resume}</p>

        <div className="space-y-3 text-gray-700">
          <p>
            Ceci est la page de détail de l’actualité.  
            Tu peux y afficher un contenu plus long, des consignes,
            des liens ou des informations supplémentaires.
          </p>
        </div>

        <Link href="/actualites" className="inline-flex text-sm font-semibold underline">
          ← Retour aux actualités
        </Link>
      </Card>
    </PageLayout>
  );
}
