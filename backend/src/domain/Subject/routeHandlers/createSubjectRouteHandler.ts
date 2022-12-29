import { Semester, Status } from '@prisma/client';
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
			id: req.query.id as string,
			title: req.query.title as string,
			description: req.query.description as string,
			ectsBod: req.query.ectsBod as string,
			semester: (String(req.query.semester)).toUpperCase() as Semester,   
			status: (String(req.query.status)).toUpperCase() as Status, 
			contentId: String(req.query.contentId).split(",") as string[],        
		});
		newSubject.validate();
		let repo = new SubjectRepositoryPrisma();
		let subject = await createSubjectInteractor(repo, newSubject);
		return res.send(subject);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
