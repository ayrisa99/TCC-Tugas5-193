import express from "express";
import { Register, Login, Logout, RefreshToken } from "../controllers/UserController.js";
import {
  getNotes,
  getNoteByID,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/NotesController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// ==== AUTH ROUTES ====
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", RefreshToken);
router.get("/logout", Logout);

// ==== NOTES ROUTES (butuh token) ====
router.get("/notes_data", verifyToken, getNotes);
router.get("/notes_data/:id", verifyToken, getNoteByID);
router.post("/notes_data", verifyToken, createNote);
router.patch("/notes_data/:id", verifyToken, updateNote);
router.delete("/notes_data/:id", verifyToken, deleteNote);

export default router;
