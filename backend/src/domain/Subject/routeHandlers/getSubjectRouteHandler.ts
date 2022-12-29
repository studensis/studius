import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getSubjectInteractor from '../interactors/getSubjectInteractor';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';

export default async function getSubjectRouteHandler(req: Request, res: Response) {
	console.log(`subjects/${req.params.subjectId} GET`);

	try {
		let id = String(req.params.subjectId);
		let repo = new SubjectRepositoryPrisma();
		let subject = await getSubjectInteractor(repo, id);
		return res.send(subject);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
