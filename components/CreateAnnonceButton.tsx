"use client"

import Link from "next/link"

export default function CreateAnnonceButton(){

  return(

    <Link
      href="/annonces/create"
      className="
        px-4 py-2
        rounded-xl
        bg-blue-600
        text-white
        text-sm
        font-semibold
        hover:bg-blue-700
      "
    >

      Créer une annonce

    </Link>

  )

}