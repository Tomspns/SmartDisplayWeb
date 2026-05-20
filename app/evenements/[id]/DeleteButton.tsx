"use client";

import { useRouter } from "next/navigation";
import { deleteContenu } from "@/lib/authApi";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {

  const router = useRouter();

  async function handleDelete() {

    const ok = confirm(
      "Voulez-vous vraiment supprimer cet événement ?"
    );

    if (!ok) return;

    try {

      await deleteContenu(id);

      alert("Événement supprimé");

      router.push("/evenements");
      router.refresh();

    } catch {

      alert("Erreur lors de la suppression");

    }

  }

  return (
    <button
      onClick={handleDelete}
      className="
        rounded-xl
        bg-red-500
        px-5
        py-2
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-red-600
      "
    >
      Supprimer
    </button>
  );
}