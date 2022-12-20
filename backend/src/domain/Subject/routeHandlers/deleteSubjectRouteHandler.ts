import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import SubjectRepositoryPrisma from "../repository/SubjectRepositoryPrisma";
import deleteSubjectInteractor from "../interactors/deleteSubjectInteractor";

export default async function deleteSubjectRouteHandler(
  req: Request,
  res: Response
) {
  console.log(`subjects/${req.params.subjectId} DELETE`);

  try {
    let id = req.params.subjectId;
    let repo = new SubjectRepositoryPrisma();
    let response = await deleteSubjectInteractor(id, repo);
    return res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}
