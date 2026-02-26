"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FavoriteType,
  getSessionEmail,
  isFavorite,
  toggleFavorite,
} from "@/lib/mockAuth";

export default function FavoriteButton({
  type,
  id,
  className = "",
}: {
  type: FavoriteType;
  id: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const init = () => {
      setMounted(true);
      try {
        const e = getSessionEmail();
        setEmail(e);
        if (e) setFav(isFavorite(type, e, id));
      } catch {
        setEmail(null);
        setFav(false);
      }
    };

    const raf = requestAnimationFrame(init);

    const refresh = () => {
      try {
        const e = getSessionEmail();
        setEmail(e);
        if (!e) return setFav(false);
        setFav(isFavorite(type, e, id));
      } catch {
        setEmail(null);
        setFav(false);
      }
    };

    window.addEventListener("auth-change", refresh);
    window.addEventListener("favorites-change", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("auth-change", refresh);
      window.removeEventListener("favorites-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [type, id]);

  // ✅ rendu stable SSR + premier rendu client (évite mismatch)
  if (!mounted) {
    return (
      <span
        className={[
          "inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold",
          "bg-white/60 border border-white/60 text-gray-700",
          className,
        ].join(" ")}
        aria-hidden="true"
        title="Favori"
      >
        ☆ Favori
      </span>
    );
  }

  // Non connecté → CTA vers connexion
  if (!email) {
    return (
      <Link
        href="/connexion"
        className={[
          "inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold",
          "bg-white/70 border border-white/70 hover:bg-white active:scale-[0.98] transition",
          className,
        ].join(" ")}
        title="Connecte-toi pour ajouter aux favoris"
      >
        ☆ Favori
      </Link>
    );
  }

  function onToggle() {
    const e = email;
    if (!e) return;
    toggleFavorite(type, email, id);
    setFav((v) => !v);
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "inline-flex items-center justify-center rounded-2xl px-3 py-2 text-xs font-semibold",
        "bg-white/70 border border-white/70 hover:bg-white active:scale-[0.98] transition",
        fav ? "text-amber-700" : "text-gray-700",
        className,
      ].join(" ")}
      title={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      {fav ? "★ Favori" : "☆ Favori"}
    </button>
  );
}
