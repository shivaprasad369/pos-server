import express from "express";
import { getContactFormSetting, upsertContactFormSetting } from "../../controller/contactFormSetting.controller.js";


const settingRouter = express.Router();

settingRouter.get("/", getContactFormSetting);
settingRouter.post("/", upsertContactFormSetting);

export default settingRouter;
