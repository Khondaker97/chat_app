import express from "express";

import { register, login, setAvatar, allUsers } from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", allUsers);

export default router;
