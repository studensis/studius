import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createSubjectInteractor from '../../Subject/interactors/createSubjectInteractor';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';
import SubjectEntity from '../SubjectEntity';

export default async function createSubjectRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/subjects POST');

	try {
		let newSubject = new SubjectEntity({
			id: undefined,
			title: req.query.title as string,
			description: req.query.description as string,
			semester: req.query.semester as string,     // treba enum semester
			status: req.query.status as string,         // treba enum status
            content: req.query.content as string,       // treba klasa Content
		});
		//newSubject.validate();
		let repo = new SubjectRepositoryPrisma();
		let subject = await createSubjectInteractor(repo, newSubject);
		return res.send(subject);
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
