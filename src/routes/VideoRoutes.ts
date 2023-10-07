import express from "express";
import ValidateToken from "../ValidateToken.js";
import { AddVideo, AddView, Sub, GetVideo, Random, Trending, UpdateVideo, GetByTags, Search} from "../controllers/Video.js";
// import {  } from "../controllers/Video.js";

const router = express.Router()

router.post("/",ValidateToken, AddVideo)

router.put("/:id",ValidateToken, UpdateVideo)

router.delete("/:id",ValidateToken, UpdateVideo)

router.get("/find/:id",ValidateToken, GetVideo)

router.put("/view/:id",ValidateToken, AddView)

router.get("/trending",ValidateToken, Trending)

router.get("/random",ValidateToken, Random)

router.get("/sub",ValidateToken, Sub)

router.get("/tags",ValidateToken, GetByTags)

router.get("/search",ValidateToken, Search)

export default router;