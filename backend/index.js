// backend/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/UserRoute.js";
import db from "./config/database.js";
import "./models/index.js"; // Sinkronisasi DB dan relasi

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Konfigurasi CORS untuk frontend yang diizinkan mengakses API
const corsOptions = {
  origin: [
    "https://frontend-193-dot-f-12-450706.uc.r.appspot.com",
    "http://localhost:3000"
  ],
  credentials: true, // penting untuk cookie
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware untuk menangani preflight CORS (OPTIONS)
app.options("*", cors(corsOptions));

// Pasang middleware CORS
app.use(cors(corsOptions));

// Middleware parsing cookie dan json
app.use(cookieParser());
app.use(express.json());

// Pasang router API
app.use(router);

// Middleware error handling standar
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Cek koneksi database lalu mulai server
console.log("Starting DB connection...");
db.authenticate()
  .then(() => {
    console.log("✅ Database connected.");
    console.log("PORT:", PORT);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err.message);
  });

