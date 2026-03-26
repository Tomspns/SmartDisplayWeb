"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function ConnexionPage() {

  const router = useRouter();
  const { login } = useAuth();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function submit(e: React.FormEvent) {

    e.preventDefault();

    await login(email,password);

    router.push("/");

  }

  return (

    <form onSubmit={submit}>

      <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button type="submit">
        Se connecter
      </button>

    </form>

  );

}