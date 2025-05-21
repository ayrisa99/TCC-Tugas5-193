// backend/models/index.js
import db from "../config/database.js";
import Users from "./UserModels.js";
import Notes from "./NotesModels.js";

// Relasi
Users.hasMany(Notes, { foreignKey: "userId", as: "notes" });
Notes.belongsTo(Users, { foreignKey: "userId", as: "user" });

// 🔁 Sinkronisasi TABEL dari semua model
const syncDatabase = async () => {
  try {
    await db.sync({ alter: true }); // alter: true = aman tanpa hapus data
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Failed to sync models:", error);
  }
};

syncDatabase();

export { Users, Notes };
