import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

import { apiFetch } from "@/lib/api";
import { Annonce } from "@/lib/authApi";

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

  if (!id) {
    return notFound();
  }

  let annonce: Annonce;

  try {
    annonce = await apiFetch(
      `/annonces/${id}`
    );
  } catch {
    return notFound();
  }

  if (annonce.type !== "offre") {
    return notFound();
  }

  return (
    <PageLayout
      title={annonce.titre}
      subtitle={`Publié le ${new Date(
        annonce.date_debut
      ).toLocaleDateString()}`}
      right={
        <Badge tone="orange">
          Offre
        </Badge>
      }
    >
      <div
        className="
          mb-6 flex items-center
          justify-between
        "
      >
        <div>
          <Link
            href="/offres"
            className="
              text-sm text-orange-600
              hover:underline
            "
          >
            ← Retour aux offres
          </Link>

          {annonce.nom && (
            <p className="mt-2 text-sm text-gray-500">
              Par {annonce.prenom} {annonce.nom}
            </p>
          )}
        </div>

        <DeleteButton
          id={annonce.id_contenu}
        />
      </div>

      <Card
        className="
          rounded-2xl border
          border-orange-100
          bg-white p-6
          shadow-xl md:p-8
        "
      >
        <div className="flex gap-2 mb-4">
          <Badge tone="orange">
            Offre
          </Badge>

          <Badge tone="neutral">
            {annonce.date_debut
              ? new Date(
                  annonce.date_debut
                ).toLocaleDateString()
              : "—"}
          </Badge>
        </div>

        <h2
          className="
            text-2xl
            font-bold
            text-gray-900
            mb-4
          "
        >
          {annonce.titre}
        </h2>

        <p
          className="
            whitespace-pre-line
            text-lg
            leading-relaxed
            text-gray-700
          "
        >
          {annonce.message}
        </p>

        {annonce.lien && (
          <div className="mt-8">
            <h3
              className="
                mb-4
                text-lg
                font-semibold
                text-gray-900
              "
            >
              Consulter l&apos;offre
            </h3>

            <a
              href={annonce.lien}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center
                rounded-xl
                bg-orange-600
                px-5 py-3
                font-medium
                text-white
                transition
                hover:bg-orange-700
              "
            >
              Ouvrir l&apos;offre
            </a>

            <div className="mt-6">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                  annonce.lien
                )}`}
                alt="QR Code"
                width={220}
                height={220}
                className="rounded-xl border"
                unoptimized
              />
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Scannez le QR Code avec votre téléphone
            </p>
          </div>
        )}
      </Card>
    </PageLayout>
  );
}