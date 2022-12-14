import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createSeminarInteractor from '../interactors/createSeminarInteractor';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';
import SeminarEntity from '../SeminarEntity';

export default async function createUserRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/users POST');

	try {
		let newSeminar = new SeminarEntity({
			id: undefined,
			title: req.query.title as string,
			description: req.query.description as string,
			mentorId: req.query.mentorId as string,
			type: req.query.type as string,
			contentId: req.query.contentId as string,
			subject: req.query.subject as string,
			user: req.query.user as string,

		});
		//newUser.validate();
		let repo = new SeminarRepositoryPrisma();
		let user = await createSeminarInteractor(repo, newSeminar);
		return res.send(user);
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
