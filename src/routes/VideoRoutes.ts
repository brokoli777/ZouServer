import express from "express";
import ValidateToken from "../ValidateToken";
import { AddVideo, AddView, ChannelVid, GetVideo, Random, Trending, UpdateVideo} from "../controllers/Video";
// import {  } from "../controllers/Video.js";

const router = express.Router()

router.post("/",ValidateToken, AddVideo)

router.put("/:id",ValidateToken, UpdateVideo)

router.delete("/:id",ValidateToken, UpdateVideo)

router.get("/find/:id",ValidateToken, GetVideo)

router.put("/view/:id",ValidateToken, AddView)

router.get("/trending",ValidateToken, Trending)

router.get("/random",ValidateToken, Random)

router.get("/channel",ValidateToken, ChannelVid)

export default router;