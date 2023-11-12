import express from "express";
import { AddComment, DeleteComment, GetComments } from "../controllers/Comment.js"
import ValidateToken from "../ValidateToken.js";

const router = express.Router()

router.post("/",ValidateToken, AddComment)
router.put("/:id",ValidateToken, DeleteComment)
router.get("/:videoID", GetComments)




export default router;