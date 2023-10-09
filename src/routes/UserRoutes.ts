import express from "express";
// import { test } from "../controllers/User.js";
import { Update, Delete, GetInfo, Subscribe, Unsubscribe, Like, Dislike } from "../controllers/User.js";
import ValidateToken from "../ValidateToken.js";

const router = express.Router()

// update user
router.put("/:id",ValidateToken, Update );

// delete user
router.delete("/:id",ValidateToken, Delete);

// get info about user
 router.get("/find/:id",GetInfo);

// subscribe to a user
router.put("/sub/:id",ValidateToken,Subscribe);

// unsubscribe to a user
router.put("/unsub/:id",ValidateToken,Unsubscribe);

// like a video
router.put("/like/:video",ValidateToken,Like);

// dislike a video
router.put("/dislike/:video",ValidateToken,Dislike);

export default router;