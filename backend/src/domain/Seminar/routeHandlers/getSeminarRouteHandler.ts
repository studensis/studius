import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getSeminarInteractor from '../interactors/getSeminarInteractor';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';

export default async function getUserRouteHandler(req: Request, res: Response) {
	console.log('/users/:userId GET');

	try {
		let id = Number(req.params.userId);
		let repo = new SeminarRepositoryPrisma();
		let user = await getSeminarInteractor(repo, id);
		return res.send(user);
	} catch {
		return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
