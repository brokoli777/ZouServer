import express from "express";
// import { test } from "../controllers/User.js";
import { Update } from "../controllers/User.js";

const router = express.Router()

router.put("/:id",Update);

router.delete("/:id"),Update;

router.get("/:id"),Update;

router.put("/sub/:id"),Update;

router.put("/unsub/:id"),Update;

router.put("/like/:video"),Update;

export default router;