import express from "express";
// import { test } from "../controllers/User.js";
import { Update, /*Delete, GetInfo, Subscribe, Unsubscribe, Like, Dislike,*/  } from "../controllers/User.js";
import ValidateToken from "../ValidateToken.js";

const router = express.Router()

// update user
router.put("/:id",ValidateToken, Update );

// // delete user
// router.delete("/:id"),Delete;

// // get info about user
// router.get("/:id"),GetInfo;

// // subscribe to a user
// router.put("/sub/:id"),Subscribe;

// // unsubscribe to a user
// router.put("/unsub/:id"),Unsubscribe;

// // like a video
// router.put("/like/:video"),Like;

// // dislike a video
// router.put("/like/:video"),Dislike;

export default router;