// backend/models/NotesModels.js
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Notes = db.define('notes_data', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true   // <-- pastikan ini aktif!
});


export default Notes;

(async () => {
    await db.sync();
})();
