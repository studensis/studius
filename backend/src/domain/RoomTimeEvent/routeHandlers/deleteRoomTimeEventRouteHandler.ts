import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import RoomTimeEventRepositoryPrisma from "../repository/RoomTimeEventRepositoryPrisma";
import deleteRoomTimeEventInteractor from "../interactors/deleteRoomTimeEventInteractor";

export default async function deleteRoomTimeEventRouteHandler(
  req: Request,
  res: Response
) {
  console.log(`roomTimeEvents/${req.params.roomTimeEventId} DELETE`);

  try {
    let id = req.params.roomTimeEventId;
    let repo = new RoomTimeEventRepositoryPrisma();
    let response = await deleteRoomTimeEventInteractor(id, repo);
    return res.send(response);
  } catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
