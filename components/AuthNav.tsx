"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSessionEmail, logout } from "@/lib/mockAuth";

export default function AuthNav() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // ✅ On décale les setState dans un callback (pas "synchronously" dans l’effet)
    const init = () => {
      setMounted(true);
      try {
        setEmail(getSessionEmail());
      } catch {
        setEmail(null);
      }
    };

    const raf = requestAnimationFrame(init);

    const refresh = () => {
      try {
        setEmail(getSessionEmail());
      } catch {
        setEmail(null);
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

  // ✅ Rendu stable SSR + premier rendu client (évite hydration mismatch)
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/connexion"
          className="
            px-4 py-2 rounded-2xl text-sm font-semibold
            bg-white/70 border border-white/70 hover:bg-white
            transition active:scale-[0.98]
          "
        >
          Connexion
        </Link>
        <Link
          href="/inscription"
          className="
            px-4 py-2 rounded-2xl text-sm font-semibold
            text-white bg-linear-to-br from-blue-600 to-purple-600 hover:brightness-110
            transition active:scale-[0.98]
          "
        >
          Inscription
        </Link>
      </div>
    );
  }

  function handleLogout() {
    logout(); // déclenche auth-change
  }

  if (email) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/profil"
          className="
            hidden sm:inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold
            bg-white/70 border border-white/70 hover:bg-white transition active:scale-[0.98]
          "
          title="Voir mon profil"
        >
          Profil
        </Link>

        <span className="hidden md:inline text-sm font-semibold text-gray-700">
          {email}
        </span>

        <button
          onClick={handleLogout}
          className="
            px-4 py-2 rounded-2xl text-sm font-semibold
            bg-white/70 border border-white/70 hover:bg-white
            transition active:scale-[0.98]
          "
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/connexion"
        className="
          px-4 py-2 rounded-2xl text-sm font-semibold
          bg-white/70 border border-white/70 hover:bg-white
          transition active:scale-[0.98]
        "
      >
        Connexion
      </Link>

      <Link
        href="/inscription"
        className="
          px-4 py-2 rounded-2xl text-sm font-semibold
          text-white bg-linear-to-br from-blue-600 to-purple-600 hover:brightness-110
          transition active:scale-[0.98]
        "
      >
        Inscription
      </Link>
    </div>
  );
}
