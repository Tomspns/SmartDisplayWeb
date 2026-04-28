"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await login(email, password);
      router.push("/");
    } catch {
      setError("Identifiants invalides");
    }
  }

  return (
    <PageLayout
      title="Se connecter"
      subtitle="Accède à ton compte SmartDisplay"
    >
      <div className="flex justify-center">

        <Card className="w-full max-w-md p-8">

          <form onSubmit={submit} className="flex flex-col gap-4">

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                px-4 py-3
                rounded-xl
                bg-gray-50
                border border-gray-200
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                transition
              "
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                px-4 py-3
                rounded-xl
                bg-gray-50
                border border-gray-200
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                transition
              "
            />

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="
                mt-2
                py-3
                rounded-xl
                font-semibold
                text-white
                bg-linear-to-r from-blue-600 to-purple-600
                hover:brightness-110
                transition
              "
            >
              Se connecter
            </button>

          </form>

        </Card>

      </div>
    </PageLayout>
  );
}