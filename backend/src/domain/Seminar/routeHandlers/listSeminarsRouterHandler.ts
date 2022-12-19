import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listSeminarsInteractor from '../interactors/listSeminarsInteractor';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';

export default async function listSeminarsRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/seminars GET');

	try {
		let repo = new SeminarRepositoryPrisma();
		let seminars = await listSeminarsInteractor(repo);
		res.send(seminars);
	} catch {
		res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
