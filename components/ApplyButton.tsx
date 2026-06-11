"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { useAuth } from "@/lib/AuthContext";

export default function ApplyButton({
  offerId,
}: {
  offerId: number;
}) {

  const { user, loading } = useAuth();

  if (loading) {

    return (
      <span
        className="
          inline-flex items-center justify-center
          rounded-2xl px-4 py-2 text-sm font-semibold
          bg-white/60 border border-white/60 text-gray-700
        "
      >
        Chargement...
      </span>
    );

  }

  if (!user) {

    return (
      <Link
        href="/connexion"
        className="
          inline-flex items-center justify-center
          rounded-2xl px-4 py-2 text-sm font-semibold
          text-white
          bg-linear-to-br
          from-blue-600
          to-purple-600
          hover:brightness-110
          transition
        "
      >
        Se connecter pour postuler
      </Link>
    );

  }

  return (
    <Button
      onClick={() =>
        alert(
          `Postuler à l'offre #${offerId} (à implémenter)`
        )
      }
    >
      Postuler
    </Button>
  );

}