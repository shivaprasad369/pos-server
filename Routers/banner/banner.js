import express from "express";
import upload from "../../middleware/upload.js";
import { deleteBanner, getBanners, updateBanner, upsertSingleBanner } from "../../controller/banner.controller.js";
import verifyToken from "../../middleware/authMiddleware.js";

const bannerRoute = express.Router();

bannerRoute.post("/", verifyToken,upload.single("bannerImage"),upsertSingleBanner);
bannerRoute.get("/", getBanners);
bannerRoute.put("/:id",verifyToken ,upload.single("bannerImage"), updateBanner);
bannerRoute.delete("/:id",verifyToken, deleteBanner);
  
//update
export default bannerRoute;
