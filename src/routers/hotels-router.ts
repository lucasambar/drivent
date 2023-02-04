import hotelsController from "@/controllers/hotels-controller";
import { authenticateToken } from "@/middlewares";
import express from "express";

const hotelsRouter = express.Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", hotelsController.get)
  .get("/:hotelId", hotelsController.getWithId);

export { hotelsRouter };
