import express from "express";
import { getAbout, upsertAbout } from "../../controller/about.controller.js";
import upload from "../../middleware/upload.js";

const aboutRouter = express.Router();


aboutRouter.get("/", getAbout);
aboutRouter.post("/", upload.single("image"), upsertAbout);

export default aboutRouter;


