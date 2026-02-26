export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "group rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl",
        "shadow-[0_10px_30px_rgba(15,23,42,0.10)]",
        "transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.15)]",
        "active:translate-y-0 active:scale-[0.995]",
        "p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
