import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import addContentInteractor from '../interactors/addContentInteractor';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';

export default async function updateSubjectRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`subjects/addContent/${req.params.subjectId} PATCH`);

	try {
		let id: string = req.params.subjectId;
		let contentId: string[] = String(req.query.contentId).split(',');

		let repo = new SubjectRepositoryPrisma();
		let updatedSubject = await addContentInteractor(repo, id, contentId);
		return res.send(updatedSubject);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
