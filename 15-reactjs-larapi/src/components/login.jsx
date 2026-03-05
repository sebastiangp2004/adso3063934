import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './login.css'; // si los estilos de login están ahí

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "¡Éxito!",
          text: data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });

        localStorage.setItem("authToken", data.token);

        setTimeout(() => navigate("/dashboard"), 1500);

      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Credenciales incorrectas",
          icon: "error"
        });
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error con la conexión",
        icon: "error"
      });
    }
  };

  return (
    <main id="login">
      <header><h1>Login</h1></header>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            placeholder="Your secret password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default Login;