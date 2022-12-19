import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getSeminarInteractor from '../interactors/getSeminarInteractor';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';

export default async function getSeminarRouteHandler(req: Request, res: Response) {
	console.log('/Seminars/:seminarId GET');

	try {
		let id = String(req.params.seminarId);
		let repo = new SeminarRepositoryPrisma();
		let seminar = await getSeminarInteractor(repo, id);
		return res.send(seminar);
	} catch {
		return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
