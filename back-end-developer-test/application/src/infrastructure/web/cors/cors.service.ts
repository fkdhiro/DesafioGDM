import cors from "cors";

export const corsOptions = {
  origin: [ "http://localhost:3000", "https://seu-dominio.com", 'http://127.0.0.1:5500'], // Defina as origens permitidas
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  credentials: true, // Permite envio de cookies entre domínios
};

export const corsMiddleware = cors(corsOptions);
