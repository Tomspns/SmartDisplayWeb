"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { apiFetch } from "@/lib/api";

export default function VerificationPage() {

  const searchParams = useSearchParams();

  const token =
    searchParams.get("token");

  const [loading, setLoading] =
    useState(true);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {

    async function verify() {

      if (!token) {

        setError("Token manquant");

        setLoading(false);

        return;

      }

      try {

        await apiFetch(
          `/auth/verify?token=${token}`,
          {
            method: "GET",
          }
        );

        setSuccess(true);

      } catch (err) {

        console.error(err);

        setError(
          "Lien invalide ou expiré"
        );

      } finally {

        setLoading(false);

      }

    }

    verify();

  }, [token]);

  return (

    <PageLayout
      title="Vérification du compte"
      subtitle="Validation de votre adresse email"
      right={<Badge tone="blue">SmartDisplay</Badge>}
    >

      <Card className="p-10 max-w-2xl mx-auto text-center">

        {loading && (

          <div className="space-y-4">

            <div className="text-5xl">
              ⏳
            </div>

            <h2 className="text-2xl font-extrabold">
              Vérification en cours...
            </h2>

            <p className="text-gray-600">
              Merci de patienter.
            </p>

          </div>

        )}

        {!loading && success && (

          <div className="space-y-5">

            <div className="text-6xl">
              ✅
            </div>

            <h2 className="text-3xl font-extrabold text-green-600">
              Email vérifié
            </h2>

            <p className="text-gray-700">
              Votre compte a bien été activé.
            </p>

            <Link
              href="/login"
              className="
                inline-flex items-center justify-center
                rounded-2xl px-6 py-3
                font-bold text-white
                bg-linear-to-r
                from-blue-600 to-purple-600
                hover:brightness-110
                transition
              "
            >
              Se connecter
            </Link>

          </div>

        )}

        {!loading && error && (

          <div className="space-y-5">

            <div className="text-6xl">
              ❌
            </div>

            <h2 className="text-3xl font-extrabold text-red-600">
              Erreur
            </h2>

            <p className="text-gray-700">
              {error}
            </p>

            <Link
              href="/register"
              className="
                inline-flex items-center justify-center
                rounded-2xl px-6 py-3
                font-bold text-white
                bg-linear-to-r
                from-red-500 to-orange-500
                hover:brightness-110
                transition
              "
            >
              Retour inscription
            </Link>

          </div>

        )}

      </Card>

    </PageLayout>

  );

}