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

db.sync();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

