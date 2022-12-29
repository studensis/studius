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
		return res.send(users);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
