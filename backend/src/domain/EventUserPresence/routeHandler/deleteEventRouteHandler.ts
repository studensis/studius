import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import EventRepositoryPrisma from "../repository/EventRepositoryPrisma";
import deleteEventInteractor from "../interactors/deleteEventInteractor";

export default async function deleteEventRouteHandler(
  req: Request,
  res: Response
) {
  console.log(`events/${req.params.eventId} DELETE`);

  try {
    let id = req.params.eventId;
    let repo = new EventRepositoryPrisma();
    let response = await deleteEventInteractor(id, repo);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
