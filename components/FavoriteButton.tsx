"use client";

import { useEffect, useState } from "react";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "@/lib/favoriteApi";

import { useAuth } from "@/lib/AuthContext";

import { useRouter } from "next/navigation";

export default function FavoriteButton({
  id,
}: {
  id: number;
}) {

  const { user } = useAuth();

  const router = useRouter();

  const [fav, setFav] =
    useState(false);

  const [loading, setLoading] =
    useState(!!user);

  useEffect(() => {

    if (!user) {
      return;
    }

    getFavorites()
      .then((list) => {

        setFav(
          list.includes(id)
        );

      })
      .catch(console.error)
      .finally(() => {

        setLoading(false);

      });

  }, [id, user]);

  async function onToggle(
    e: React.MouseEvent
  ) {

    e.preventDefault();
    e.stopPropagation();

    if (!user) {

      router.push("/connexion");
      return;

    }

    try {

      if (fav) {

        await removeFavorite(id);

      } else {

        await addFavorite(id);

      }

      setFav(!fav);

    } catch (err) {

      console.error(err);

    }

  }

  if (loading) {

    return (
      <button
        className="
          px-3 py-2
          text-xs
          rounded-xl
          bg-white
          border
        "
      >
        ...
      </button>
    );

  }

  return (

    <button
      onClick={onToggle}
      className="
        px-3 py-2
        text-xs
        rounded-xl
        bg-white
        border
      "
    >
      {fav
        ? "★ Favori"
        : "☆ Favori"}
    </button>

  );

}