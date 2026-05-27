"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Card from "@/components/Card";
import Badge from "@/components/Badge";
import HomeSearch from "@/components/HomeSearch";

import { apiFetch } from "@/lib/api";

type Contenu = {
  id_contenu: number;
  titre: string;
  message: string;
  type: string;
  date_creation?: string;
};

function Feature({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-extrabold tracking-tight">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {desc}
      </p>
    </Card>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Card className="p-5">
      <div className="text-sm text-gray-600">
        {label}
      </div>

      <div className="mt-1 text-2xl font-extrabold tracking-tight">
        {value}
      </div>
    </Card>
  );
}

export default function HomePage() {

  const [contenus, setContenus] =
    useState<Contenu[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await apiFetch<Contenu[]>("/annonces");

        setContenus(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  const actualites =
    contenus
      .filter((c) => c.type === "actualite")
      .slice(0, 1);

  const offres =
    contenus
      .filter((c) => c.type === "offre")
      .slice(0, 1);

  const evenements =
    contenus
      .filter((c) => c.type === "evenement")
      .slice(0, 1);

  return (

    <main className="space-y-6">

      {/* HERO */}

      <HomeSearch />

      <Card className="p-8 md:p-12 overflow-hidden">

        <div className="relative">

          {/* Décor */}

          <div
            className="
              pointer-events-none absolute
              -top-24 -right-24
              h-72 w-72 rounded-full
              bg-blue-600/15 blur-3xl
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-24 -left-24
              h-72 w-72 rounded-full
              bg-purple-600/15 blur-3xl
            "
          />

          <div
            className="
              grid gap-8
              md:grid-cols-2
              md:items-center
            "
          >

            {/* LEFT */}

            <div>

              <div className="flex flex-wrap gap-2">

                <Badge tone="blue">
                  Next.js
                </Badge>

                <Badge tone="purple">
                  SmartDisplay
                </Badge>

                <Badge tone="green">
                  Campus
                </Badge>

              </div>

              <h1
                className="
                  mt-4 text-4xl md:text-5xl
                  font-extrabold tracking-tight
                "
              >

                SmartDisplay

                <span
                  className="
                    block text-gray-600
                    text-2xl md:text-3xl
                    font-bold mt-2
                  "
                >
                  L’info du campus,
                  claire et instantanée.
                </span>

              </h1>

              <p
                className="
                  mt-4 text-gray-700
                  leading-relaxed
                "
              >

                Ce site web centralise les
                <strong> actualités</strong>,
                les
                <strong> offres</strong>
                {" "}(stages / alternances)
                et les
                <strong> événements</strong>
                {" "}du campus dans une interface moderne.

                L’objectif :
                <strong> gagner du temps</strong>,
                <strong> éviter la dispersion</strong>
                {" "}des informations,
                et rendre la communication
                <strong> plus efficace</strong>
                {" "}pour les étudiants.

              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <Link
                  href="/actualites"
                  className="
                    inline-flex items-center justify-center
                    rounded-2xl px-5 py-3
                    text-sm font-semibold text-white
                    bg-linear-to-br
                    from-blue-600 to-purple-600
                    hover:brightness-110
                    transition active:scale-[0.98]
                  "
                >
                  Découvrir les actualités
                </Link>

                <Link
                  href="/offres"
                  className="
                    inline-flex items-center justify-center
                    rounded-2xl px-5 py-3
                    text-sm font-semibold
                    bg-white/70 border border-white/70
                    hover:bg-white
                    transition active:scale-[0.98]
                  "
                >
                  Voir les offres
                </Link>

                <Link
                  href="/evenements"
                  className="
                    inline-flex items-center justify-center
                    rounded-2xl px-5 py-3
                    text-sm font-semibold
                    bg-transparent hover:bg-white/60
                    transition active:scale-[0.98]
                  "
                >
                  Agenda des événements
                </Link>

              </div>

              <p className="mt-4 text-xs text-gray-500">

                Projet pédagogique :
                interface web moderne +
                API REST sécurisée +
                affichage dynamique
                des données campus.

              </p>

            </div>

            {/* RIGHT */}

            <div className="grid gap-3">

              <div className="grid grid-cols-2 gap-3">

                <Stat
                  label="Accès rapide"
                  value="3 sections"
                />

                <Stat
                  label="Objectif"
                  value="Info centralisée"
                />

              </div>

              <Card className="p-6">

                <div className="flex items-center justify-between">

                  <h3 className="font-extrabold tracking-tight">
                    Aperçu
                  </h3>

                  <Badge tone="neutral">
                    Live
                  </Badge>

                </div>

                {loading ? (

                  <div className="mt-6 text-gray-500">
                    Chargement...
                  </div>

                ) : (

                  <div className="mt-4 space-y-3">

                    {/* ACTUALITÉ */}

                    {actualites[0] && (

                      <div
                        className="
                          rounded-2xl border
                          border-white/60
                          bg-white/60 p-4
                        "
                      >

                        <div className="text-xs text-gray-500">
                          Actualité
                        </div>

                        <div className="font-bold">
                          {actualites[0].titre}
                        </div>

                        <div className="text-sm text-gray-600 line-clamp-2">
                          {actualites[0].message}
                        </div>

                      </div>

                    )}

                    {/* OFFRE */}

                    {offres[0] && (

                      <div
                        className="
                          rounded-2xl border
                          border-white/60
                          bg-white/60 p-4
                        "
                      >

                        <div className="text-xs text-gray-500">
                          Offre
                        </div>

                        <div className="font-bold">
                          {offres[0].titre}
                        </div>

                        <div className="text-sm text-gray-600 line-clamp-2">
                          {offres[0].message}
                        </div>

                      </div>

                    )}

                    {/* ÉVÉNEMENT */}

                    {evenements[0] && (

                      <div
                        className="
                          rounded-2xl border
                          border-white/60
                          bg-white/60 p-4
                        "
                      >

                        <div className="text-xs text-gray-500">
                          Événement
                        </div>

                        <div className="font-bold">
                          {evenements[0].titre}
                        </div>

                        <div className="text-sm text-gray-600 line-clamp-2">
                          {evenements[0].message}
                        </div>

                      </div>

                    )}

                  </div>

                )}

              </Card>

            </div>

          </div>

        </div>

      </Card>

      {/* POURQUOI */}

      <div className="grid gap-4 md:grid-cols-3">

        <Feature
          title="Pourquoi ce site ?"
          desc="
            Les informations du campus
            sont souvent dispersées
            (mail, affichage, réseaux).
            SmartDisplay les regroupe
            en un seul endroit pour une
            consultation rapide.
          "
        />

        <Feature
          title="Ce que l’étudiant gagne"
          desc="
            Moins d’informations perdues,
            accès direct aux opportunités,
            calendrier lisible,
            et détails accessibles
            en un clic.
          "
        />

        <Feature
          title="Ce que le campus gagne"
          desc="
            Une communication plus claire
            et plus moderne,
            plus de visibilité
            sur les événements
            et les offres,
            et une meilleure réactivité.
          "
        />

      </div>

      {/* FONCTIONNALITÉS */}

      <Card className="p-7">

        <h2 className="text-2xl font-extrabold tracking-tight">
          Fonctionnalités principales
        </h2>

        <p className="mt-2 text-gray-600">

          Une interface pensée
          pour la clarté :
          consultation,
          filtres,
          pages détails
          et navigation rapide.

        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">

          <Card className="p-6">

            <div className="flex gap-2 mb-3">

              <Badge tone="blue">
                Actualités
              </Badge>

              <Badge tone="neutral">
                Détails
              </Badge>

            </div>

            <p className="text-sm text-gray-600">

              Consulter les annonces,
              comprendre le contexte,
              accéder rapidement
              aux informations utiles.

            </p>

          </Card>

          <Card className="p-6">

            <div className="flex gap-2 mb-3">

              <Badge tone="orange">
                Offres
              </Badge>

              <Badge tone="neutral">
                Filtres
              </Badge>

            </div>

            <p className="text-sm text-gray-600">

              Rechercher et filtrer
              les stages et alternances,
              puis ouvrir une offre
              pour consulter les détails.

            </p>

          </Card>

          <Card className="p-6">

            <div className="flex gap-2 mb-3">

              <Badge tone="green">
                Événements
              </Badge>

              <Badge tone="neutral">
                Agenda
              </Badge>

            </div>

            <p className="text-sm text-gray-600">

              Voir les dates,
              les lieux,
              les horaires,
              et accéder à une page
              détaillée pour chaque événement.

            </p>

          </Card>

        </div>

      </Card>

      {/* CTA FINAL */}

      <Card className="p-8">

        <div
          className="
            flex flex-col gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div>

            <h2 className="text-2xl font-extrabold tracking-tight">

              Prêt à explorer le campus ?

            </h2>

            <p className="mt-2 text-gray-600">

              Accède directement aux sections
              et teste la navigation
              vers les pages détails.

            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/actualites"
              className="
                inline-flex items-center justify-center
                rounded-2xl px-5 py-3
                text-sm font-semibold text-white
                bg-linear-to-br
                from-blue-600 to-purple-600
                hover:brightness-110
                transition active:scale-[0.98]
              "
            >
              Aller aux actualités
            </Link>

            <Link
              href="/offres"
              className="
                inline-flex items-center justify-center
                rounded-2xl px-5 py-3
                text-sm font-semibold
                bg-white/70 border border-white/70
                hover:bg-white
                transition active:scale-[0.98]
              "
            >
              Aller aux offres
            </Link>

          </div>

        </div>

      </Card>

    </main>

  );

}