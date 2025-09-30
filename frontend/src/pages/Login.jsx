import { useState } from "react";
import { useNavigate } from "react-router-dom"; // importamos hook
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // hook de navegación

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token); // guardamos token
      setMsg("✅ Login exitoso");
      navigate("/profile"); // redirigimos al perfil
    } catch (err) {
      setMsg(err.response?.data?.error || "Error en el login");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <button type="submit">Ingresar</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
