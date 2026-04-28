import "./globals.css";
import Link from "next/link";
import AuthNav from "@/components/AuthNav";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/AuthContext";

const navLinks = [
  { href: "/actualites", label: "Actualités" },
  { href: "/offres", label: "Offres" },
  { href: "/evenements", label: "Événements" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="
        px-4 py-2 rounded-2xl text-sm font-semibold
        transition-all duration-200
        hover:bg-white/60 hover:-translate-y-0.5
        active:translate-y-0 active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-white/70
      "
    >
      {label}
    </Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen text-gray-900 bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_circle_at_90%_10%,rgba(168,85,247,0.18),transparent_50%),linear-gradient(to_bottom,#f8fafc,#ffffff)]">

        <AuthProvider>

          <header className="sticky top-0 z-50 border-b border-white/40 bg-white/35 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <span className="h-9 w-9 rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 shadow-sm" />
                <span className="font-extrabold tracking-tight text-lg">
                  SmartDisplay
                </span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                {navLinks.map((l) => (
                  <NavLink key={l.href} href={l.href} label={l.label} />
                ))}
              </nav>

              {/* Auth */}
              <AuthNav />

            </div>
          </header>

          {/* Page */}
          <div className="mx-auto max-w-6xl px-4 py-8">
            {children}
          </div>

          {/* Footer */}
          <footer className="mt-10 border-t border-white/40 bg-white/20">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
              SmartDisplay — Campus • Actualités • Offres • Événements
            </div>
          </footer>

          {/* Toast */}
          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{ top: 80 }}
            toastOptions={{
              style: {
                borderRadius: "12px",
                background: "#333",
                color: "#fff",
              },
            }}
          />

        </AuthProvider>

      </body>
    </html>
  );
}