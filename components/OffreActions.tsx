"use client";

import Button from "@/components/Button";

export default function OffreActions() {
  return (
    <div className="mt-5 flex gap-2">
      <Button onClick={() => alert("Détails à implémenter")}>Voir</Button>
      <Button variant="ghost" onClick={() => alert("Candidature à implémenter")}>
        Postuler
      </Button>
    </div>
  );
}
