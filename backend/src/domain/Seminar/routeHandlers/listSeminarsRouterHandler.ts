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
		return res.send(seminars);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
