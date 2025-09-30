// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Si no hay token, redirige al login
        return;
      }

      try {
        const res = await API.get("/me", {
          headers: { Authorization: `Bearer ${token}` }, // Enviar token
        });
        setUser(res.data.user);
      } catch (err) {
        setMsg("❌ Error al obtener el perfil");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div>
      <h2>Perfil</h2>
      {user ? (
        <div>
          <p>Nombre: {user.nombre}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>{msg}</p>
      )}
    </div>
  );
}
