"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { apiFetch } from "@/lib/api";

export default function CreateAnnoncePage() {

  const router = useRouter();

  const [type, setType] = useState("actualite");
  const [titre, setTitre] = useState("");
  const [resume, setResume] = useState("");
  const [contenu, setContenu] = useState("");
  const [categorie, setCategorie] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMsg(null);

    try {

      await apiFetch("/annonces", {
        method: "POST",
        body: JSON.stringify({
          type,
          titre,
          resume,
          contenu,
          categorie,
          date
        })
      });

      setMsg("Annonce créée avec succès");

      setTimeout(() => {
        router.push("/actualites");
      }, 1000);

    } catch (err: unknown) {

  if (err instanceof Error) {
    setMsg(err.message);
  } else {
    setMsg("Erreur inconnue");
  }

}

    setLoading(false);
  }

  return (

    <PageLayout
      title="Créer une annonce"
      subtitle="Publier une actualité, une offre ou un événement"
    >

      <Card className="max-w-xl mx-auto p-6">

        <form onSubmit={submit} className="space-y-4">

          {/* TYPE */}

          <div>

            <label className="block text-sm font-semibold mb-1">
              Type dannonce
            </label>

            <select
              value={type}
              onChange={(e)=>setType(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="actualite">Actualité</option>
              <option value="offre">Offre</option>
              <option value="evenement">Événement</option>
            </select>

          </div>

          {/* TITRE */}

          <div>

            <label className="block text-sm font-semibold mb-1">
              Titre
            </label>

            <input
              value={titre}
              onChange={(e)=>setTitre(e.target.value)}
              required
              className="w-full border rounded-lg p-2"
            />

          </div>

          {/* RESUME */}

          <div>

            <label className="block text-sm font-semibold mb-1">
              Résumé
            </label>

            <input
              value={resume}
              onChange={(e)=>setResume(e.target.value)}
              required
              className="w-full border rounded-lg p-2"
            />

          </div>

          {/* CONTENU */}

          <div>

            <label className="block text-sm font-semibold mb-1">
              Contenu
            </label>

            <textarea
              value={contenu}
              onChange={(e)=>setContenu(e.target.value)}
              rows={5}
              className="w-full border rounded-lg p-2"
            />

          </div>

          {/* CATEGORIE */}

          <div>

            <label className="block text-sm font-semibold mb-1">
              Catégorie
            </label>

            <input
              value={categorie}
              onChange={(e)=>setCategorie(e.target.value)}
              className="w-full border rounded-lg p-2"
            />

          </div>

          {/* DATE */}

          <div>

            <label className="block text-sm font-semibold mb-1">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
              className="w-full border rounded-lg p-2"
            />

          </div>

          {/* BOUTON */}

          <Button disabled={loading}>

            {loading ? "Publication..." : "Publier l'annonce"}

          </Button>

          {msg && (
            <p className="text-sm text-green-600">
              {msg}
            </p>
          )}

        </form>

      </Card>

    </PageLayout>

  );

}