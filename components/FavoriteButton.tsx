"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FavoriteType,
  getSessionEmail,
  isFavorite,
  toggleFavorite,
} from "@/lib/mockAuth";

export default function FavoriteButton({
  type,
  id,
}: {
  type: FavoriteType;
  id: number;
}) {
  const router = useRouter();

  // 🔥 récupération directe (pas de useEffect)
  const email = getSessionEmail();

  const [fav, setFav] = useState(() => {
    if (!email) return false;
    return isFavorite(type, email, id);
  });

  // 🔴 utilisateur NON connecté
  if (!email) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push("/connexion");
        }}
        className="px-3 py-2 text-xs rounded-xl bg-white border"
      >
        ☆ Favori
      </button>
    );
  }

  function onToggle(e: React.MouseEvent) {
    e.stopPropagation();

    // ✅ email garanti non null ici
    toggleFavorite(type, email!, id);

    setFav((v) => !v);
  }

  return (
    <button
      onClick={onToggle}
      className="px-3 py-2 text-xs rounded-xl bg-white border"
    >
      {fav ? "★ Favori" : "☆ Favori"}
    </button>
  );
}