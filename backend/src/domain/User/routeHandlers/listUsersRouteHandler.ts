import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listUsersInteractor from '../interactors/listUsersInteractor';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';

export default async function listUsersRouteHandler(
	req: Request,
	res: Response
) {
	try {
		let repo = new UserRepositoryPrisma();
		let users = await listUsersInteractor(repo);
		console.log(users); //testiranje
		res.send(users);
	} catch {
		res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
