import cors from "cors";

export const corsOptions = {
  origin: [ "http://localhost:3000", "https://seu-dominio.com", 'http://127.0.0.1:5500', "abundant-simplicity-production.up.railway.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
