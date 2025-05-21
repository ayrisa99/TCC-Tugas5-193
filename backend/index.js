// backend/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/UserRoute.js";
import db from "./config/database.js";

dotenv.config();

const app = express();

// 👉 Aktifkan CORS
app.use(cors({
  credentials: true,
  origin: "https://frontend-193-dot-f-12-450706.uc.r.appspot.com"
}));

// 👉 Tangani preflight request (OPTIONS) juga
app.options('*', cors({
  credentials: true,
  origin: "https://frontend-193-dot-f-12-450706.uc.r.appspot.com"
}));

app.use(cookieParser());
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 5000;

db.authenticate()
  .then(() => {
    console.log("✅ Database connected.");
    return db.sync(); // optional kalau belum migrasi
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err.message);
  });

