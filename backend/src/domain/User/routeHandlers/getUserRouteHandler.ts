import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getUserInteractor from '../interactors/getUserInteractor';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';

export default async function getUserRouteHandler(req: Request, res: Response) {
	console.log('/users/:userId GET');

	try {
		let id = Number(req.params.userId);
		let repo = new UserRepositoryPrisma();
		let user = await getUserInteractor(repo, id);
		return res.send(user);
	} catch {
		return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
