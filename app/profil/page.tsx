"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Button from "@/components/Button";
import {
  me,
  logout,
  updateProfile,
  User,
  MeResponse,
} from "@/lib/authApi";
import { getErrorMessage } from "@/lib/errors";

export default function ProfilPage() {
  const r = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data: MeResponse = await me();

        if (data?.user) {
          setUser(data.user);

          setForm({
            nom: data.user.nom || "",
            prenom: data.user.prenom || "",
            email: data.user.email || "",
            telephone: data.user.telephone || "",
            dateNaissance: data.user.dateNaissance || "",
          });
        } else {
          r.push("/connexion");
        }
      } catch {
        r.push("/connexion");
      }
    })();
  }, [r]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setMsg(null);

    try {
      await updateProfile(form);

      setMsg("Profil mis à jour");

      const data = await me();

      if (data?.user) {
        setUser(data.user);
      }

      window.dispatchEvent(
        new Event("auth-change")
      );
    } catch (e: unknown) {
      setMsg(getErrorMessage(e));
    }
  }

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
      <div className="flex justify-center">
        <Card className="w-full max-w-xl space-y-6">
          {!user ? (
            <p>Chargement...</p>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <div
                  className="
                    h-14 w-14 rounded-full
                    bg-linear-to-br
                    from-blue-600 to-purple-600
                    flex items-center justify-center
                    text-white text-xl font-bold
                  "
                >
                  {user.prenom?.[0] ||
                    user.email?.[0]}
                </div>

                <div>
                  <p className="font-semibold text-lg">
                    {user.prenom} {user.nom}
                  </p>

                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <label className="text-sm text-gray-600">
                    Nom
                  </label>

                  <input
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl
                      border border-gray-200
                      bg-white/80
                      px-4 py-3
                      text-gray-800
                      shadow-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                    "
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-600">
                    Prénom
                  </label>

                  <input
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl
                      border border-gray-200
                      bg-white/80
                      px-4 py-3
                      text-gray-800
                      shadow-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                    "
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-600">
                    Email
                  </label>

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl
                      border border-gray-200
                      bg-white/80
                      px-4 py-3
                      text-gray-800
                      shadow-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                    "
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-600">
                    Téléphone
                  </label>

                  <input
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl
                      border border-gray-200
                      bg-white/80
                      px-4 py-3
                      text-gray-800
                      shadow-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                    "
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-600">
                    Date de naissance
                  </label>

                  <input
                    type="date"
                    name="dateNaissance"
                    value={form.dateNaissance}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl
                      border border-gray-200
                      bg-white/80
                      px-4 py-3
                      text-gray-800
                      shadow-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                    "
                  />
                </div>

                <div
                  className="
                    flex flex-col
                    sm:flex-row
                    gap-3
                    pt-2
                  "
                >
                  <Button type="submit">
                    Modifier mon profil
                  </Button>

                  <Button
                    type="button"
                    onClick={doLogout}
                  >
                    Se déconnecter
                  </Button>
                </div>

                {msg && (
                  <p className="text-sm text-red-600">
                    {msg}
                  </p>
                )}
              </form>
            </>
          )}
        </Card>
      </div>
    </PageLayout>
  );
}