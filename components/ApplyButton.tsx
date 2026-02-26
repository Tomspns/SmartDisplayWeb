"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { getSessionEmail } from "@/lib/mockAuth";

export default function ApplyButton({ offerId }: { offerId: number }) {
  const [mounted, setMounted] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const init = () => {
      setMounted(true);
      try {
        setConnected(!!getSessionEmail());
      } catch {
        setConnected(false);
      }
    };

    const raf = requestAnimationFrame(init);

    const refresh = () => {
      try {
        setConnected(!!getSessionEmail());
      } catch {
        setConnected(false);
      }
    };

    window.addEventListener("auth-change", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("auth-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  // ✅ rendu stable SSR + 1er client
  if (!mounted) {
    return (
      <span
        className="
          inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold
          bg-white/60 border border-white/60 text-gray-700
        "
        aria-hidden="true"
      >
        Postuler
      </span>
    );
  }

  if (!connected) {
    return (
      <Link
        href="/connexion"
        className="
          inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold
          text-white bg-linear-to-br from-blue-600 to-purple-600 hover:brightness-110
          transition active:scale-[0.98]
        "
        title="Connecte-toi pour postuler"
      >
        Se connecter pour postuler
      </Link>
    );
  }

  return (
    <Button onClick={() => alert(`Postuler à l’offre #${offerId} (à brancher plus tard)`)}>
      Postuler
    </Button>
  );
}
