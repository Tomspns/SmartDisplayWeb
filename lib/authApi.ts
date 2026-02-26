import { apiFetch } from "./api";

export type RegisterInput = {
  nom: string;
  prenom: string;
  dateNaissance: string; // YYYY-MM-DD
  email: string;
  password: string;
  telephone?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type User = {
  id_user: number;
  nom: string;
  prenom: string;
  email: string;
  id_role: number;
  dateNaissance?: string;
  telephone?: string | null;
};

export type MeResponse =
  | { user: User }
  | { ok: boolean; auth: { sub: string; email: string; role?: number } };

export async function register(input: RegisterInput) {
  return apiFetch<{ user: User }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function login(input: LoginInput) {
  return apiFetch<{ user: User }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function me() {
  return apiFetch<MeResponse>("/me", { method: "GET" });
}

export async function logout() {
  return apiFetch<{ ok: boolean }>("/auth/logout", { method: "POST" });
}
