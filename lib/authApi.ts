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

  // 🔥 NOUVEAU
  date_naissance?: string;
  numero_telephone?: string;
};

export type Annonce = {
  id_contenu: number;

  titre: string;

  message: string;

  type: string;

  date_debut: string;

  date_fin?: string;

  nom?: string;
  prenom?: string;

  // 🔥 FUTUR QR / LIENS
  lien?: string;
};


// =============================
// EMPLOIS DU TEMPS
// =============================

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

  localStorage.setItem("token", res.token);

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
// ANNONCES
// =============================

export async function getAnnonces(): Promise<Annonce[]> {

  return apiFetch("/annonces", {
    method: "GET",
  });

}


// =============================
// DELETE CONTENU
// =============================

export async function deleteContenu(id: number) {

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

export async function deleteEmploi(id: number) {

  return apiFetch(`/emplois/${id}`, {

    method: "DELETE",

  });

}