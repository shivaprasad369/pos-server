import express from "express";
import {
  createService,
  updateService,
  deleteService,
  getServices,
} from "../../controller/service.controller.js";

const serviceRoutes = express.Router();

serviceRoutes.post("/", createService);
serviceRoutes.get("/", getServices);
serviceRoutes.put("/:id", updateService);
serviceRoutes.delete("/:id", deleteService);

export default serviceRoutes;
