import express, { Request, Response, NextFunction } from "express";
// import {  } from "../controllers/Video.js";
import { signup, signin, googleAuthentication} from "../controllers/Authentication.js";

const router = express.Router()

// Creating User
router.post("/signup",signup)
// Sign in
router.post("/signin", signin)
// Authentication Google Account
router.post("/google", googleAuthentication)

export default router;