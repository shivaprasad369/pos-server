import express from "express";
import upload from "../../middleware/upload.js";
import { deleteBanner, getBanners, updateBanner, upsertSingleBanner } from "../../controller/banner.controller.js";

const bannerRoute = express.Router();

bannerRoute.post("/", upload.single("bannerImage"),upsertSingleBanner);
bannerRoute.get("/", getBanners);
bannerRoute.put("/:id", upload.single("bannerImage"), updateBanner);
bannerRoute.delete("/:id", deleteBanner);
  
//update
export default bannerRoute;
