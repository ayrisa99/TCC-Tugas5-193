import express from "express";
import {getUser, getUserByID,createUser,updateUser,deleteUser} from "../controllers/UserController.js";


const router = express.Router();

router.get('/notes_data', getUser);
router.get('/notes_data/:id', getUserByID);
router.post('/notes_data', createUser);
router.patch('/notes_data/:id', updateUser);
router.delete('/notes_data/:id', deleteUser);

export default router;