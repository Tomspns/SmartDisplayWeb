"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  className = "",
  variant = "primary",
  disabled,
  ...props
}: Props) {
  const base =
    `
    inline-flex items-center justify-center gap-2
    rounded-2xl px-5 py-3 text-sm font-semibold
    select-none
    transition-[transform,box-shadow,background-color,color,border-color,filter,opacity]
    duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    will-change-transform
    hover:-translate-y-0.5
    active:translate-y-0 active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-white/70
  `;

  const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary:
      `
      text-white
      bg-gradient-to-br from-blue-600 to-purple-600
      hover:brightness-110 hover:saturate-110
      shadow-[0_12px_30px_rgba(59,130,246,0.18)]
    `,
    secondary:
      `
      bg-white/70 border border-white/70
      text-gray-900
      hover:bg-white
      shadow-[0_10px_25px_rgba(15,23,42,0.08)]
    `,
    ghost:
      `
      bg-transparent
      text-gray-900
      hover:bg-white/60
    `,
  };

  const disabledStyle = disabled
    ? "opacity-60 pointer-events-none hover:translate-y-0 active:scale-100"
    : "";

  return (
    <button
      {...props}
      disabled={disabled}
      className={[base, variants[variant], disabledStyle, className].join(" ")}
    />
  );
}
