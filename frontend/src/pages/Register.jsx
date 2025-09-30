import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // 2. Crear hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/register", form);
    localStorage.setItem("token", res.data.token); // guardar token
    setMsg("✅ Usuario registrado con éxito");
    navigate("/profile"); // redirigir al perfil
  } catch (err) {
    setMsg(err.response?.data?.error || "Error en el registro");
  }
};


  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
