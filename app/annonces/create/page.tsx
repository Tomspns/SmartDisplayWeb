"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { apiFetch } from "@/lib/api";

export default function CreateAnnoncePage() {
  const router = useRouter();

  const [type, setType] = useState("info");
  const [titre, setTitre] = useState("");
  const [message, setMessage] = useState("");
  const [categorie, setCategorie] = useState("");
  const [date, setDate] = useState("");
  const [lien, setLien] = useState("");
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
          message,
          categorie,
          date_debut: date || null,
          lien: lien || null,
        }),
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
      <div className="flex justify-center">

        <Card className="w-full max-w-xl p-6">

          <form onSubmit={submit} className="space-y-4">

            {/* TYPE */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                {"Type d'annonce"}
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded-xl p-3 bg-gray-50"
              >
                <option value="info">Actualité</option>
                <option value="alerte">Offre</option>
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
                onChange={(e) => setTitre(e.target.value)}
                required
                className="w-full border rounded-xl p-3 bg-gray-50"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full border rounded-xl p-3 bg-gray-50"
              />
            </div>

            {/* CATEGORIE */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Catégorie
              </label>

              <input
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="w-full border rounded-xl p-3 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Lien externe
              </label>

              <input
                type="url"
                value={lien}
                onChange={(e) => setLien(e.target.value)}
                placeholder="https://..."
                className="w-full border rounded-xl p-3 bg-gray-50"
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
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-xl p-3 bg-gray-50"
              />
            </div>

            {/* BUTTON */}
            <Button disabled={loading}>
              {loading ? "Publication..." : "Publier l'annonce"}
            </Button>

            {/* MESSAGE */}
            {msg && (
              <p className="text-sm text-green-600">
                {msg}
              </p>
            )}

          </form>

        </Card>

      </div>
    </PageLayout>
  );
}