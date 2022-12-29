import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ContentRepositoryPrisma from "../repository/ContentRepositoryPrisma";
import deleteContentInteractor from "../interactors/deleteContentInteractor";

export default async function deleteContentRouteHandler(
  req: Request,
  res: Response
) {
  console.log(`contents/${req.params.contentId} DELETE`);

  try {
    let id = req.params.contentId;
    let repo = new ContentRepositoryPrisma();
    let response = await deleteContentInteractor(id, repo);
    return res.send(response);
  }
  catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
