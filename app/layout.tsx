import "./globals.css";

import Link from "next/link";

import AuthNav from "@/components/AuthNav";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/lib/AuthContext";

const navLinks = [
  { href: "/actualites", label: "Actualités" },
  { href: "/offres", label: "Offres" },
  { href: "/evenements", label: "Événements" },

  // 🔥 NOUVEAU
  { href: "/emplois", label: "Emplois du temps" },
];

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="fr">

      <body
        className="
          min-h-screen text-gray-900
          bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_circle_at_90%_10%,rgba(168,85,247,0.18),transparent_50%),linear-gradient(to_bottom,#f8fafc,#ffffff)]
        "
      >

        <AuthProvider>

          {/* HEADER */}

          <header
            className="
              sticky top-0 z-50
              border-b border-white/40
              bg-white/35 backdrop-blur-xl
            "
          >

            <div
              className="
                mx-auto max-w-7xl
                px-4 py-3
                flex items-center justify-between gap-4
                overflow-hidden
              "
            >

              {/* LOGO */}

              <Link
                href="/"
                className="flex items-center gap-3"
              >

                <span
                  className="
                    h-10 w-10 rounded-2xl
                    bg-linear-to-br from-blue-600 to-purple-600
                    shadow-md
                  "
                />

                <div className="flex flex-col leading-none">

                  <span
                    className="
                      font-extrabold tracking-tight text-lg
                    "
                  >
                    SmartDisplay
                  </span>

                  <span className="text-xs text-gray-500">
                    Campus intelligent
                  </span>

                </div>

              </Link>

              {/* NAVIGATION */}

              <nav
                className="
                  hidden md:flex
                  items-center gap-2
                  rounded-2xl
                  bg-white/40
                  p-1
                "
              >

                {navLinks.map((l) => (

                  <NavLink
                    key={l.href}
                    href={l.href}
                    label={l.label}
                  />

                ))}

              </nav>

              {/* AUTH */}

              <AuthNav />

            </div>

          </header>

          <div
            className="
              md:hidden
              sticky top-18.25
              z-40
              bg-white/80
              backdrop-blur-xl
              border-b
              overflow-x-auto
            "
          >
            <div className="flex flex-wrap gap-2 p-3 justify-center">
              {navLinks.map((l) => (
                <NavLink
                  key={l.href}
                  href={l.href}
                  label={l.label}
                />
              ))}
            </div>
          </div>

          {/* CONTENU */}

          <div
            className="
              mx-auto max-w-7xl
              px-4 py-8
            "
          >
            {children}
          </div>

          {/* FOOTER */}

          <footer
            className="
              mt-10
              border-t border-white/40
              bg-white/20
            "
          >

            <div
              className="
                mx-auto max-w-7xl
                px-4 py-8
                text-sm text-gray-600
              "
            >

              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                <div className="max-w-full wrap-break-word">
                  SmartDisplay — Campus • Actualités • Offres • Événements • Emplois du temps
                </div>

                <div className="text-xs text-gray-500">
                  API PHP Slim • Next.js • JWT • MySQL
                </div>

              </div>

            </div>

          </footer>

          {/* TOAST */}

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{
              top: 80,
            }}
            toastOptions={{
              style: {
                borderRadius: "14px",
                background: "#18181b",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.08)",
              },
            }}
          />

        </AuthProvider>

      </body>

    </html>

  );
}