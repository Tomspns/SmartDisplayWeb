import { apiFetch } from "./api";

// =============================
// TYPES
// =============================

export type User = {
  id_user: number;
  nom: string;
  prenom: string;
  email: string;
  id_role: number;
};

export type Annonce = {
  id_contenu: number;
  titre: string;
  message: string;
  type: string;
  date_debut: string;
  nom?: string;
  prenom?: string;
};

export type MeResponse = {
  user: User;
};

// =============================
// AUTH
// =============================

export async function register(input: {
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  password: string;
  telephone?: string;
}) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function login(input: {
  email: string;
  password: string;
}) {
  const res = await apiFetch<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });

  localStorage.setItem("token", res.token);
  return res;
}

export async function me(): Promise<MeResponse> {
  return apiFetch("/me", {
    method: "GET",
  });
}

export async function logout() {
  localStorage.removeItem("token");
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}

// =============================
// PROFIL (🔥 AJOUTÉ)
// =============================

export async function updateProfile(data: {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance?: string;
}) {
  return apiFetch("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// =============================
// ANNONCES
// =============================

export async function getAnnonces(): Promise<Annonce[]> {
  return apiFetch("/annonces", {
    method: "GET",
  });
}