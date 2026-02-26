"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { me, logout, User, MeResponse } from "@/lib/authApi";
import { getErrorMessage } from "@/lib/errors";

export default function ProfilPage() {
  const r = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data: MeResponse = await me();

        if ("user" in data) {
          setUser(data.user);
        } else if ("auth" in data) {
          // fallback si ton /me renvoie le payload JWT
          setUser({
            id_user: Number(data.auth.sub),
            email: data.auth.email,
            nom: "",
            prenom: "",
            id_role: data.auth.role ?? 0,
          });
        } else {
          r.push("/connexion");
        }
      } catch {
        r.push("/connexion");
      }
    })();
  }, [r]);

  async function doLogout() {
    setMsg(null);
    try {
      await logout();
      r.push("/");
    } catch (e: unknown) {
      setMsg(getErrorMessage(e));
    }
  }

  return (
    <PageLayout title="Mon profil">
      <Card className="max-w-xl space-y-4">
        {!user ? (
          <p>Chargement...</p>
        ) : (
          <>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>

            {(user.nom || user.prenom) && (
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Nom</p>
                <p className="font-semibold">
                  {user.prenom} {user.nom}
                </p>
              </div>
            )}

            <Button onClick={doLogout}>Se déconnecter</Button>
            {msg && <p className="text-sm text-red-600">{msg}</p>}
          </>
        )}
      </Card>
    </PageLayout>
  );
}