import { notFound } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import FavoriteButton from "@/components/FavoriteButton";
import ApplyButton from "@/components/ApplyButton";
import { offres } from "@/data/mock";

type Params = { id: string };
type Props = { params: Params | Promise<Params> };

export default async function OffreDetailsPage({ params }: Props) {
  const p = await params;
  const id = Number(p.id);
  const offre = offres.find((o) => o.id === id);

  if (!offre) return notFound();

  return (
    <PageLayout
      title={offre.titre}
      subtitle={`${offre.entreprise} • ${offre.lieu} • ${offre.duree}`}
      right={
        <div className="flex gap-2">
          <FavoriteButton type="offres" id={offre.id} />
          <Badge tone={offre.type === "Stage" ? "orange" : "green"}>{offre.type}</Badge>
        </div>
      }
    >
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {offre.tags.map((t) => (
            <Badge key={t} tone="neutral">{t}</Badge>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-bold">Description</h2>
          <p className="mt-1 text-gray-600">{offre.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ApplyButton offerId={offre.id} />
          <Link
            href="/offres"
            className="
              inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold
              bg-white/70 border border-white/70 hover:bg-white transition active:scale-[0.98]
            "
          >
            Retour
          </Link>
        </div>
      </Card>
    </PageLayout>
  );
}
