import express from "express";
import upload from "../../middleware/upload";
import { createBanner, deleteBanner, updateBanner } from "../../controller/banner.controller";

const bannerRoute = express.Router();

bannerRoute.post("/", upload.single("bannerImage"),createBanner);
bannerRoute.put("/:id", upload.single("bannerImage"), updateBanner);
bannerRoute.delete("/:id", deleteBanner);
  
//update
export default bannerRoute;
