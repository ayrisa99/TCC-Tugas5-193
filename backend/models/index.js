// backend/models/index.js
import db from "../config/database.js";
import Users from "./UserModels.js";
import Notes from "./NotesModels.js";

// Relasi
Users.hasMany(Notes, { foreignKey: "userId", as: "notes" });
Notes.belongsTo(Users, { foreignKey: "userId", as: "user" });

// Sync DB jika belum migrasi (opsional saat produksi)
db.sync().then(() => console.log("✅ Models synchronized."));

export { Users, Notes };
