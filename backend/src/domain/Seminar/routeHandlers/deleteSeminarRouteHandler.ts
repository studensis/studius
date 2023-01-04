import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import deleteSeminarInteractor from '../interactors/deleteSeminarInteractor';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';

export default async function deleteSeminarRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`seminars/${req.params.seminarId} DELETE`);

	try {
		let id = req.params.seminarId;
		let repo = new SeminarRepositoryPrisma();
		let response = await deleteSeminarInteractor(id, repo);
		return res.send(response);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
