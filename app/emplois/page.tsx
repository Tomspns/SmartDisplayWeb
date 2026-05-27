"use client";

import { useEffect, useMemo, useState } from "react";

import PageLayout from "@/components/PageLayout";
import Badge from "@/components/Badge";

import { apiFetch } from "@/lib/api";

const jours = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
];

const horaires = [
  "08:05-09:00",
  "09:00-09:55",
  "10:10-11:05",
  "11:05-12:00",
  "12:05-13:00",
  "13:30-14:25",
  "14:25-15:20",
  "15:30-16:25",
  "16:30-17:25",
];

type Emploi = {

  id_edt: number;

  classe: string;

  jour: string;

  heure_debut: string;

  heure_fin: string;

  matiere: string;

  professeur?: string;

  salle?: string;

};

const couleurs: Record<string, string> = {

  INFO: "from-blue-500 to-cyan-500",

  MATHS: "from-pink-500 to-rose-500",

  PHYSIQUE: "from-yellow-500 to-orange-500",

  ANGLAIS: "from-red-500 to-orange-500",

  "CULTURE GÉNÉRALE":
    "from-purple-500 to-fuchsia-500",

  "INFO TP":
    "from-sky-500 to-blue-500",

  "PHYSIQUE TP":
    "from-amber-500 to-yellow-500",

  "INFO / MATHS":
    "from-indigo-500 to-pink-500",

  "INFO / ANGLAIS":
    "from-cyan-500 to-red-500",

  "INFO / PHYSIQUE":
    "from-cyan-600 to-yellow-500",

  ACCOMPAGNEMENT:
    "from-emerald-500 to-green-500",

};

export default function EmploisPage() {

  const [classe, setClasse] =
    useState("CIEL1");

  const [
    jourSelectionne,
    setJourSelectionne
  ] = useState<string>("Semaine");

  const [emplois, setEmplois] =
    useState<Emploi[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await apiFetch<Emploi[]>(
            "/emplois"
          );

        setEmplois(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  const cours = useMemo(() => {

    return emplois.filter(
      (e) => e.classe === classe
    );

  }, [emplois, classe]);

  function getCours(
    jour: string,
    heure: string
  ) {

    const [startSlot] =
      heure.split("-");

    return cours.find((c) => {

      if (c.jour !== jour) {
        return false;
      }

      const coursStart =
        c.heure_debut.slice(0, 5);

      const coursEnd =
        c.heure_fin.slice(0, 5);

      return (
        startSlot >= coursStart &&
        startSlot < coursEnd
      );

    });

  }

  return (

    <PageLayout
      title="Emplois du temps"
      subtitle="Planning hebdomadaire des classes du campus"
      right={
        <Badge tone="blue">
          {classe}
        </Badge>
      }
    >

      {/* CLASSES */}

      <div
        className="
          flex flex-wrap
          gap-2 md:gap-3
        "
      >

        {["CIEL1", "CIEL2"].map((c) => (

          <button
            key={c}
            onClick={() =>
              setClasse(c)
            }
            className={`
              px-4 py-2.5
              md:px-5 md:py-3
              rounded-2xl
              font-bold
              text-sm md:text-base
              transition-all
              ${
                classe === c
                  ? `
                    bg-linear-to-r
                    from-blue-600
                    to-purple-600
                    text-white
                    shadow-lg
                    scale-105
                  `
                  : `
                    bg-white
                    border
                    border-gray-200
                    hover:bg-gray-50
                  `
              }
            `}
          >
            {c}
          </button>

        ))}

      </div>

      {/* JOURS */}

      <div
        className="
          flex flex-wrap
          gap-2 md:gap-3
        "
      >

        {[
          "Semaine",
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
        ].map((jour) => (

          <button
            key={jour}
            onClick={() =>
              setJourSelectionne(
                jour
              )
            }
            className={`
              px-4 py-2.5
              md:px-5 md:py-3
              rounded-2xl
              font-bold
              text-sm md:text-base
              transition-all
              ${
                jourSelectionne === jour
                  ? `
                    bg-black
                    text-white
                  `
                  : `
                    bg-white
                    border
                    border-gray-200
                    hover:bg-gray-50
                  `
              }
            `}
          >
            {jour}
          </button>

        ))}

      </div>

      {/* LOADING */}

      {loading ? (

        <div
          className="
            rounded-3xl
            bg-white
            p-6 md:p-10
            shadow-xl
            border
            border-gray-100
            text-center
          "
        >

          Chargement des emplois du temps...

        </div>

      ) : (

        <div
          className="
            overflow-auto
            rounded-3xl
            bg-white
            shadow-xl
            border
            border-gray-100
          "
        >

          <table
            className="
              w-full
              border-collapse
              min-w-225
              md:min-w-full
            "
          >

            <thead>

              <tr className="bg-gray-50">

                <th
                  className="
                    p-2 md:p-5
                    text-xs md:text-base
                    text-left
                    font-extrabold
                    text-gray-700
                    border-b
                  "
                >
                  Horaires
                </th>

                {jours
                  .filter((jour) => {

                    if (
                      jourSelectionne
                      === "Semaine"
                    ) {
                      return true;
                    }

                    return (
                      jour
                      === jourSelectionne
                    );

                  })
                  .map((jour) => (

                    <th
                      key={jour}
                      className="
                        p-2 md:p-5
                        text-xs md:text-base
                        text-center
                        font-extrabold
                        text-gray-700
                        border-b
                      "
                    >
                      {jour}
                    </th>

                  ))}

              </tr>

            </thead>

            <tbody>

              {horaires.map((heure) => (

                <tr
                  key={heure}
                  className="border-b"
                >

                  <td
                    className="
                      p-2 md:p-4
                      text-xs md:text-sm
                      font-bold
                      text-gray-600
                      bg-gray-50
                      w-32 md:w-52
                    "
                  >
                    {heure}
                  </td>

                  {jours
                    .filter((jour) => {

                      if (
                        jourSelectionne
                        === "Semaine"
                      ) {
                        return true;
                      }

                      return (
                        jour
                        === jourSelectionne
                      );

                    })
                    .map((jour) => {

                      const coursCell =
                        getCours(
                          jour,
                          heure
                        );

                      return (

                        <td
                          key={
                            jour + heure
                          }
                          className="
                            p-1 md:p-3
                            align-top
                            h-24 md:h-36
                          "
                        >

                          {coursCell ? (

                            <div
                              className={`
                                min-h-20
                                md:min-h-27.5
                                h-full
                                rounded-2xl
                                md:rounded-3xl
                                p-2 md:p-4
                                text-white
                                shadow-lg
                                bg-linear-to-br
                                ${
                                  couleurs[
                                    coursCell
                                      .matiere
                                  ]
                                  ||
                                  `
                                    from-gray-500
                                    to-gray-700
                                  `
                                }
                              `}
                            >

                              <div
                                className="
                                  font-black
                                  text-sm md:text-lg
                                  leading-tight
                                "
                              >
                                {
                                  coursCell.matiere
                                }
                              </div>

                              <div
                                className="
                                  mt-2 md:mt-3
                                  text-[10px]
                                  md:text-sm
                                  opacity-90
                                "
                              >
                                👨‍🏫{" "}
                                {
                                  coursCell.professeur
                                  ||
                                  "Professeur"
                                }
                              </div>

                              {coursCell.salle && (

                                <div
                                  className="
                                    mt-1
                                    text-[10px]
                                    md:text-sm
                                    opacity-90
                                  "
                                >
                                  📍{" "}
                                  {
                                    coursCell.salle
                                  }
                                </div>

                              )}

                              <div
                                className="
                                  mt-2 md:mt-3
                                  text-[9px]
                                  md:text-xs
                                  opacity-75
                                "
                              >
                                {
                                  coursCell
                                    .heure_debut
                                    .slice(0, 5)
                                }

                                {" - "}

                                {
                                  coursCell
                                    .heure_fin
                                    .slice(0, 5)
                                }

                              </div>

                            </div>

                          ) : (

                            <div
                              className="
                                h-full
                                rounded-2xl
                                md:rounded-3xl
                                border
                                border-dashed
                                border-gray-200
                                bg-gray-50/40
                              "
                            />

                          )}

                        </td>

                      );

                    })}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </PageLayout>

  );

}