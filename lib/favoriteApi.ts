import { apiFetch } from "./api";

export async function getFavorites(): Promise<number[]> {
  return apiFetch("/favoris", {
    method: "GET",
  });
}

export async function addFavorite(
  id: number
) {
  return apiFetch(`/favoris/${id}`, {
    method: "POST",
  });
}

export async function removeFavorite(
  id: number
) {
  return apiFetch(`/favoris/${id}`, {
    method: "DELETE",
  });
}

