export type User = {
  email: string;
  password: string;

  nom: string;
  prenom: string;
  dateNaissance: string; // YYYY-MM-DD recommandé
  telephone?: string;
};

const USERS_KEY = "mock_users";
const SESSION_KEY = "mock_session_email";

/* ---------- Users ---------- */
function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as User[];
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(user: User) {
  const users = getUsers();
  const email = user.email.toLowerCase().trim();

  if (users.some((u) => u.email === email)) {
    throw new Error("Un compte existe déjà avec cet email.");
  }

  users.push({
    ...user,
    email,
    telephone: user.telephone?.trim() || undefined,
  });

  saveUsers(users);
}

export function login(email: string, password: string) {
  const users = getUsers();
  const cleanEmail = email.toLowerCase().trim();

  const user = users.find((u) => u.email === cleanEmail && u.password === password);
  if (!user) throw new Error("Identifiants invalides.");

  localStorage.setItem(SESSION_KEY, cleanEmail);
  window.dispatchEvent(new Event("auth-change"));
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("auth-change"));
}

export function getSessionEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const email = getSessionEmail();
  if (!email) return null;
  const users = getUsers();
  return users.find((u) => u.email === email) || null;
}

/* ✅ NOUVEAU : Mise à jour du profil (email non modifiable ici) */
export function updateCurrentUserProfile(update: {
  nom: string;
  prenom: string;
  dateNaissance: string;
  telephone?: string;
}) {
  const email = getSessionEmail();
  if (!email) throw new Error("Non connecté.");

  const users = getUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) throw new Error("Utilisateur introuvable.");

  users[idx] = {
    ...users[idx],
    nom: update.nom.trim(),
    prenom: update.prenom.trim(),
    dateNaissance: update.dateNaissance.trim(),
    telephone: update.telephone?.trim() || undefined,
  };

  saveUsers(users);
  window.dispatchEvent(new Event("auth-change"));
}

/* ---------- Favorites ---------- */
export type FavoriteType = "offres" | "actualites" | "evenements";

function favKey(type: FavoriteType, email: string) {
  return `fav:${type}:${email}`;
}

export function getFavorites(type: FavoriteType, email: string): number[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(favKey(type, email)) || "[]") as number[];
}

export function isFavorite(type: FavoriteType, email: string, id: number): boolean {
  return getFavorites(type, email).includes(id);
}

export function toggleFavorite(type: FavoriteType, email: string, id: number): number[] {
  const list = getFavorites(type, email);
  const next = list.includes(id) ? list.filter((x) => x !== id) : [id, ...list];
  localStorage.setItem(favKey(type, email), JSON.stringify(next));
  window.dispatchEvent(new Event("favorites-change"));
  return next;
}
