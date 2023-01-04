import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getSeminarInteractor from '../interactors/getSeminarInteractor';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';

export default async function getSeminarRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`seminars/${req.params.seminarId} GET`);

	try {
		let id = String(req.params.seminarId);
		let repo = new SeminarRepositoryPrisma();
		let seminar = await getSeminarInteractor(repo, id);
		return res.send(seminar);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
