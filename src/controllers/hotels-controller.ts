import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";

async function get(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const response = await hotelService.get(userId);
  return res.send(response);
}

async function getWithId(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const hotelId = Number(req.params.hotelId);
  const response = await hotelService.getWithId(userId, hotelId);
  return res.send(response);
}

const hotelsController = {
  get,
  getWithId
};
export default hotelsController;
