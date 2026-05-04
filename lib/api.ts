const API_URL = "http://20.19.169.91:8080";

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Erreur API");
  }

  return res.json();
}