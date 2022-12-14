import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listSubjectsInteractor from '../interactors/listSubjectsInteractor';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';

export default async function listSubjectsRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/subjects GET');

	try {
		let repo = new SubjectRepositoryPrisma();
		let subjects = await listSubjectsInteractor(repo);
		res.send(subjects);
	} catch {
		res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
