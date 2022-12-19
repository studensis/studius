import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserRepositoryPrisma from "../repository/UserRepositoryPrisma";
import deleteUserInteractor from "../interactors/deleteUserInteractor";

export default async function deleteUserRouteHandler(
  req: Request,
  res: Response
) {
  console.log("/users/:userEmail/delete POST");

  try {
    let email = req.params.userEmail;
    let repo = new UserRepositoryPrisma();
    let response = await deleteUserInteractor(email, repo);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
