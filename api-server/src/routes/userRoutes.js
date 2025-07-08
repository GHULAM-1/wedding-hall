import express from "express";
import { getAUser } from "../controllers/user/get-a-user.js";
import { getAllUser } from "../controllers/user/get-all-user.js";
import { deleteUser } from "../controllers/user/delete-user.js";
import { postAUser } from "../controllers/user/post-a-user.js";
import { updateUser } from "../controllers/user/update-user.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getAUser);
router.post("/", postAUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
