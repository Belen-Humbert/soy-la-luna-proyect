import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generar token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "soy-la-luna-secret", { expiresIn: "7d" });
};

// Registro
export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "El email ya está registrado" });

    const newUser = new User({ nombre, email, password });
    await newUser.save();

    res.status(201).json({ msg: "Usuario registrado ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = generateToken(user);

    res.json({ token, user: { id: user._id, nombre: user.nombre, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
};
