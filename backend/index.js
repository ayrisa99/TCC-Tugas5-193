// backend/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/UserRoute.js";
import db from "./config/database.js";
import "./models/index.js"; // 👈 akan otomatis sync DB & relasi

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Konfigurasi CORS
const corsOptions = {
  origin: [
    "https://frontend-193-dot-f-12-450706.uc.r.appspot.com",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.options('*', cors(corsOptions));  // preflight CORS
app.use(cors(corsOptions));    

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});


db.authenticate()
  .then(() => {
    console.log("✅ Database connected.");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running and listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err.message);
  });
