import { apiFetch } from "./api";

export type User = {
  id_user: number;
  nom: string;
  prenom: string;
  email: string;
  id_role: number;
};

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

export async function me() {
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