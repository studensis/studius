import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PostRepositoryPrisma from "../repository/PostRepositoryPrisma";
import deletePostInteractor from "../interactors/deletePostInteractor";

export default async function deletePostRouteHandler(
  req: Request,
  res: Response
) {
  console.log(`posts/${req.params.postId} DELETE`);

  try {
    let id = req.params.postId;
    let repo = new PostRepositoryPrisma();
    let response = await deletePostInteractor(id, repo);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
