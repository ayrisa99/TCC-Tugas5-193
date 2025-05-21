// backend/models/index.js
import Users from "./UserModels.js";
import Notes from "./NotesModels.js";

// Relasi: 1 User memiliki banyak Notes
Users.hasMany(Notes, {
  foreignKey: "userId",
  as: "notes"
});

// Relasi: Setiap Notes milik 1 User
Notes.belongsTo(Users, {
  foreignKey: "userId",
  as: "user"
});

export { Users, Notes };
