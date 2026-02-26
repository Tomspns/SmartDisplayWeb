"use client";

import { getErrorMessage } from "@/lib/errors";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { register } from "@/lib/authApi";

export default function InscriptionPage() {
  const r = useRouter();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    email: "",
    telephone: "",
    password: "",
    password2: "",
  });
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function submit() {
    setMsg(null);

    if (!form.nom || !form.prenom || !form.dateNaissance || !form.email || !form.password) {
      setMsg("Merci de remplir tous les champs obligatoires.");
      return;
    }
    if (form.password !== form.password2) {
      setMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      await register({
        nom: form.nom,
        prenom: form.prenom,
        dateNaissance: form.dateNaissance,
        email: form.email,
        password: form.password,
        telephone: form.telephone || undefined,
      });

      // Option: rediriger vers connexion
      r.push("/connexion");
    } catch (e: unknown) {
      setMsg(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout title="Créer un compte">
      <Card className="max-w-xl space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="input" placeholder="Nom *" value={form.nom} onChange={(e) => set("nom", e.target.value)} />
          <input className="input" placeholder="Prénom *" value={form.prenom} onChange={(e) => set("prenom", e.target.value)} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="input"
            type="date"
            placeholder="Date de naissance *"
            value={form.dateNaissance}
            onChange={(e) => set("dateNaissance", e.target.value)}
          />
          <input className="input" placeholder="Téléphone (facultatif)" value={form.telephone} onChange={(e) => set("telephone", e.target.value)} />
        </div>

        <input className="input" placeholder="Email *" value={form.email} onChange={(e) => set("email", e.target.value)} />
        <input className="input" type="password" placeholder="Mot de passe *" value={form.password} onChange={(e) => set("password", e.target.value)} />
        <input className="input" type="password" placeholder="Confirmer le mot de passe *" value={form.password2} onChange={(e) => set("password2", e.target.value)} />

        <Button onClick={submit} disabled={loading}>
          {loading ? "Création..." : "Créer mon compte"}
        </Button>

        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <p className="text-xs text-gray-600">* Champs obligatoires</p>
      </Card>
    </PageLayout>
  );
}
