import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import RoomRepositoryPrisma from "../repository/RoomRepositoryPrisma";
import deleteRoomInteractor from "../interactors/deleteRoomInteractor";

export default async function deleteRoomRouteHandler(
  req: Request,
  res: Response
) {
  console.log(`rooms/${req.params.roomId} DELETE`);

  try {
    let id = req.params.roomId;
    let repo = new RoomRepositoryPrisma();
    let response = await deleteRoomInteractor(id, repo);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
