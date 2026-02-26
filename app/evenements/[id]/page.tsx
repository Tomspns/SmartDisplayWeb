import { notFound } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { evenements } from "@/data/mock";

type BadgeTone = "neutral" | "blue" | "purple" | "green" | "orange";

function toneFor(type: string): BadgeTone {
  if (type === "Tech") return "purple";
  if (type === "Carrière") return "blue";
  return "green";
}

type Params = { id: string };
type Props = { params: Params | Promise<Params> };

export default async function EvenementDetailsPage({ params }: Props) {
  const p = await params;
  const id = Number(p.id);
  const evenement = evenements.find((e) => e.id === id);

  if (!evenement) return notFound();

  return (
    <PageLayout
      title={evenement.titre}
      subtitle={`${evenement.date} à ${evenement.heure} • ${evenement.lieu}`}
      right={<Badge tone={toneFor(evenement.type)}>{evenement.type}</Badge>}
    >
      <Card className="space-y-4">
        <p className="text-gray-600">{evenement.resume}</p>

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="p-5">
            <div className="text-sm text-gray-500">Date</div>
            <div className="font-bold">{evenement.date}</div>
          </Card>
          <Card className="p-5">
            <div className="text-sm text-gray-500">Heure</div>
            <div className="font-bold">{evenement.heure}</div>
          </Card>
        </div>

        <Link href="/evenements" className="inline-flex text-sm font-semibold underline">
          ← Retour aux événements
        </Link>
      </Card>
    </PageLayout>
  );
}
