// backend/controllers/NotesController.js
import Notes from "../models/NotesModels.js";

export const getNotes = async (req, res) => {
  try {
    const response = await Notes.findAll({
      where: {
        userId: req.userId  // Ambil dari JWT yang diverifikasi
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getNoteByID = async (req, res) => {
    try {
        const response = await Notes.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const createNote = async (req, res) => {
  try {
    await Notes.create({
      judul: req.body.judul,
      isi: req.body.isi,
      userId: req.userId // <- pastikan ini diisi otomatis
    });
    res.status(201).json({ msg: "Note Created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    console.log("PATCH /notes_data/:id called");
    console.log("Params id:", req.params.id);
    console.log("Body:", req.body);
    console.log("UserId from token:", req.userId);

    const result = await Notes.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (result[0] === 0) {
      return res.status(404).json({ msg: "Note not found or unauthorized" });
    }

    res.status(200).json({ msg: "Note Updated" });
  } catch (error) {
    console.log("Error in updateNote:", error.message);
    res.status(500).json({ error: error.message });
  }
};



export const deleteNote = async (req, res) => {
    try {
        await Notes.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Note Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};
