import express from "express";
import {
  createService,
  updateService,
  deleteService,
  getServices,
} from "../../controller/service.controller.js";
import verifyToken from "../../middleware/authMiddleware.js";

const serviceRoutes = express.Router();

serviceRoutes.post("/", verifyToken, createService);
serviceRoutes.get("/", getServices);
serviceRoutes.put("/:id",verifyToken,  updateService);
serviceRoutes.delete("/:id",verifyToken,  deleteService);

export default serviceRoutes;
