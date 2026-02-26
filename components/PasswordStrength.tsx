export default function PasswordStrength({ password }: { password: string }) {
  const score = getScore(password);
  const label = ["Très faible", "Faible", "Moyen", "Fort", "Très fort"][score];
  const width = ["0%", "25%", "50%", "75%", "100%"][score];
  const barClass =
    ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-emerald-500", "bg-emerald-600"][score];

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Force du mot de passe</span>
        <span className="text-xs font-semibold text-gray-700">{label}</span>
      </div>

      <div className="mt-2 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-200 ${barClass}`}
          style={{ width }}
        />
      </div>

      <ul className="mt-2 text-xs text-gray-600 space-y-1">
        <li className={password.length >= 8 ? "text-emerald-700" : ""}>• 8 caractères minimum</li>
        <li className={/[A-Z]/.test(password) ? "text-emerald-700" : ""}>• 1 majuscule</li>
        <li className={/[0-9]/.test(password) ? "text-emerald-700" : ""}>• 1 chiffre</li>
        <li className={/[^A-Za-z0-9]/.test(password) ? "text-emerald-700" : ""}>• 1 symbole</li>
      </ul>
    </div>
  );
}

function getScore(pw: string) {
  if (!pw) return 0;

  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;

  // Normalise sur 0..4
  if (s <= 1) return 1;
  if (s === 2) return 2;
  if (s === 3) return 3;
  return 4;
}
