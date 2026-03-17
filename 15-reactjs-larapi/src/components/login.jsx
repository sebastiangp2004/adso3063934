import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './login.css'; // si los estilos de login están ahí
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password
      });
      localStorage.setItem("authToken", res.data.token);
      Swal.fire({
        icon: "success",
        title: "Login successful"
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Please check your credentials and try again."
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