import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listSeminarInteractor from '../interactors/listSeminarInteractor';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';

export default async function listUsersRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/users GET');

	try {
		let repo = new SeminarRepositoryPrisma();
		let users = await listSeminarInteractor(repo);
		res.send(users);
	} catch {
		res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
