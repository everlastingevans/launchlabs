"use client";

export default function Dashboard() {
  return (
    <main style={{ padding: 24 }}>
      <h1>✅ Dashboard</h1>
      <p>You’re authenticated (any user).</p>
      <p>
        Go to <a href="/admin">Admin</a> (admin only).
      </p>
    </main>
  );
}
