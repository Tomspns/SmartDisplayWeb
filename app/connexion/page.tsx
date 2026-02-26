"use client";

import { getErrorMessage } from "@/lib/errors";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { login } from "@/lib/authApi";

export default function ConnexionPage() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setMsg(null);
    setLoading(true);
    try {
      await login({ email, password });
      r.push("/profil");
    } catch (e: unknown) {
      setMsg(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout title="Connexion">
      <Card className="space-y-3 max-w-xl">
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={submit} disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
      </Card>
    </PageLayout>
  );
}
