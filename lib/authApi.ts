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
    credentials: "include",
    body: JSON.stringify(input),
  });
}

export async function login(input: {
  email: string;
  password: string;
}) {
  return apiFetch("/auth/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(input),
  });
}

export async function me() {
  return apiFetch("/me", {
    method: "GET",
    credentials: "include",
  });
}

export async function logout() {
  return apiFetch("/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

// =============================
// USERS
// =============================

export async function getUsers() {
  return apiFetch<{ users: User[] }>("/users", {
    method: "GET",
    credentials: "include",
  });
}

export async function deleteUser(id: number) {
  return apiFetch(`/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function updateUser(
  id: number,
  data: {
    nom: string;
    prenom: string;
    email: string;
    id_role: number;
  }
) {
  return apiFetch(`/users/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(data),
  });
}

// =============================
// PROFIL
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
    credentials: "include",
    body: JSON.stringify(data),
  });
}

// =============================
// ANNONCES
// =============================

export async function getAnnonces(): Promise<Annonce[]> {
  return apiFetch("/annonces", {
    method: "GET",
    credentials: "include",
  });
}