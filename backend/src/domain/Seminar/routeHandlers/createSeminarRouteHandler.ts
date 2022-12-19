import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createSeminarInteractor from '../interactors/createSeminarInteractor';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';
import SeminarEntity from '../SeminarEntity';

export default async function createSeminarRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/seminars POST');

	try {
		let newSeminar = new SeminarEntity({
			id: undefined,
			title: req.query.title as string,
			description: req.query.description as string,
			mentorId: req.query.mentorId as string,
			type: req.query.type as string,
			contentId: req.query.contentId as string,		//Content
			subjectId: req.query.subjectId as string,			//Subject
			userId: req.query.userId as string,					//User
		});
		//newSeminar.validate();
		let repo = new SeminarRepositoryPrisma();
		console.log('Vamo sam')
		let seminar = await createSeminarInteractor(repo, newSeminar);
		return res.send(seminar);
	} catch (err) {
		console.log(err)
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
