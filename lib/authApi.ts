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

  dateNaissance?: string;

  telephone?: string;
};

export type Annonce = {
  id_contenu: number;

  titre: string;

  message: string;

  type:
    | "actualite"
    | "offre"
    | "evenement";

  date_debut: string;

  date_fin?: string;

  nom?: string;

  prenom?: string;

  lien?: string;
};

export type Emploi = {
  id_edt: number;

  classe: string;

  jour: string;

  heure_debut: string;

  heure_fin: string;

  matiere: string;

  professeur?: string;

  salle?: string;

  couleur?: string;
};

// =============================
// REPONSES API
// =============================

export type MeResponse = {
  user: User;
};

export type UsersResponse = {
  users: User[];
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

// =============================
// LOGIN
// =============================

export async function login(input: {
  email: string;
  password: string;
}) {
  const res = await apiFetch<{ token: string }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(input),
    }
  );

  localStorage.setItem(
    "token",
    res.token
  );

  return res;
}

// =============================
// PROFIL CONNECTÉ
// =============================

export async function me(): Promise<MeResponse> {
  return apiFetch("/me", {
    method: "GET",
  });
}

// =============================
// LOGOUT
// =============================

export async function logout() {
  localStorage.removeItem("token");

  return apiFetch("/auth/logout", {
    method: "POST",
  });
}

// =============================
// UPDATE PROFIL
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
// ADMIN USERS
// =============================

export async function getUsers(): Promise<UsersResponse> {
  return apiFetch("/users", {
    method: "GET",
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
    body: JSON.stringify(data),
  });
}

export async function deleteUser(
  id: number
) {
  return apiFetch(`/users/${id}`, {
    method: "DELETE",
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

export async function deleteContenu(
  id: number
) {
  return apiFetch(`/contenus/${id}`, {
    method: "DELETE",
  });
}

// =============================
// EMPLOIS DU TEMPS
// =============================

export async function getEmplois(): Promise<Emploi[]> {
  return apiFetch("/emplois", {
    method: "GET",
  });
}

export async function getEmploisClasse(
  classe: string
): Promise<Emploi[]> {
  return apiFetch(`/emplois/${classe}`, {
    method: "GET",
  });
}

// =============================
// CREATE EMPLOI
// =============================

export async function createEmploi(data: {
  classe: string;
  jour: string;
  heure_debut: string;
  heure_fin: string;
  matiere: string;
  professeur?: string;
  salle?: string;
  couleur?: string;
}) {
  return apiFetch("/emplois", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// =============================
// DELETE EMPLOI
// =============================

export async function deleteEmploi(
  id: number
) {
  return apiFetch(`/emplois/${id}`, {
    method: "DELETE",
  });
}