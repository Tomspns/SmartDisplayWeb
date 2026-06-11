"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function AuthNav() {

  const { user,loading,logout } = useAuth();

  if(loading){
    return null;
  }

  if(user){

    return(

      <div
        className="
          flex items-center gap-3
          overflow-x-auto
          whitespace-nowrap
          max-w-[55vw]
          scrollbar-hide
        "
      >

        {user.id_role === 2 && (
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Admin
          </Link>
        )}

        <Link
          href="/favoris"
          className="
            px-4 py-2 rounded-xl
            text-sm font-semibold
            bg-white/70
            border border-white/70
            hover:bg-white
            transition
          "
        >
          Favoris
        </Link>

        <Link
          href="/profil"
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/70 border border-white/70 hover:bg-white transition"
        >
          Profil
        </Link>

        <span
          className="
            hidden lg:flex
            items-center gap-2
            text-sm
            font-semibold
            text-gray-700
            max-w-55
            truncate
          "
        >
          {user.email}
        </span>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/70 border border-white/70 hover:bg-white transition"
        >
          Déconnexion
        </button>

      </div>

    );

  }

  return(

    <div className="flex items-center gap-2">

      <Link
        href="/connexion"
        className="px-4 py-2 rounded-2xl text-sm font-semibold bg-white/70 border border-white/70 hover:bg-white transition"
      >
        Connexion
      </Link>

      <Link
        href="/inscription"
        className="px-4 py-2 rounded-2xl text-sm font-semibold text-white bg-linear-to-br from-blue-600 to-purple-600 hover:brightness-110 transition"
      >
        Inscription
      </Link>

    </div>

  );

}