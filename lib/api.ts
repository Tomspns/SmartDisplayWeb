const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL manquant (mets-le dans .env.local puis relance npm run dev)");
}

type ApiErrorShape = { error?: string; message?: string };

function safeJsonParse(text: string): unknown {
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // ✅ cookie httpOnly
  });

  const text = await res.text();
  const parsed = safeJsonParse(text);

  if (!res.ok) {
    if (parsed && typeof parsed === "object") {
      const e = parsed as ApiErrorShape;
      throw new Error(e.error || e.message || `Erreur API ${res.status}`);
    }
    throw new Error(typeof parsed === "string" ? parsed : `Erreur API ${res.status}`);
  }

  return parsed as T;
}
