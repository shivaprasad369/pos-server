import express from "express";
import { getContactFormSetting, upsertContactFormSetting } from "../../controller/contactFormSetting.controller.js";
import verifyToken from "../../middleware/authMiddleware.js";


const settingRouter = express.Router();

settingRouter.get("/", getContactFormSetting);
settingRouter.post("/",verifyToken, upsertContactFormSetting);

export default settingRouter;
