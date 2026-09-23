"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data?.error ? "Signup failed" : "Signup failed");
        return;
      }

      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>📝 Sign Up</h1>

      <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <button disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Creating..." : "Create account"}
        </button>

        {err && <p style={{ color: "red", marginTop: 10 }}>{err}</p>}

        <p style={{ marginTop: 12 }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </main>
  );
}