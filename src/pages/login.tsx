import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      const j = await res.json();
      setError(j?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 30,
        border: "1px solid #ccc",
        borderRadius: 8,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Username
            <input
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Password
            <input
              required
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      <div style={{ marginTop: 16, fontSize: 12 }}>
        Use username <strong>hpuser</strong> (hp) or <strong>lenovouser</strong>{" "}
        (Lenovo). Password any.
      </div>
    </div>
  );
}
