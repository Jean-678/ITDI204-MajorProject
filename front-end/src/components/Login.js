import { useState } from "react";
import { FaEnvelope, FaLock, FaEye } from "react-icons/fa";

function Login({ onAuthSuccess, setMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.user) {
      onAuthSuccess(data.user);
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="auth-card">

      <img src="/main_logo.png" className="auth-logo" alt="logo" />

      <h2>Welcome Back!</h2>
      <p className="auth-sub">Login to your account</p>

      {/* EMAIL */}
      <div className="input-box">
        <FaEnvelope className="input-icon" />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* PASSWORD */}
      <div className="input-box">
        <FaLock className="input-icon" />
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FaEye className="eye-icon" onClick={() => setShow(!show)} />
      </div>

      <button onClick={handleLogin}>Login →</button>

<p className="auth-switch">
  Don't have an account?{" "}
  <span onClick={() => setMode("signup")}>
    Sign Up
  </span>
</p>
    </div>
  );
}

export default Login;