import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listEnrollmentsInteractor from '../interactors/listEnrollmentsInteractor';
import EnrollmentRepositoryPrisma from '../repository/EnrollmentRepositoryPrisma';

export default async function listEnrollmentsRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/enrollments GET');

	try {
		let repo = new EnrollmentRepositoryPrisma();
		let rez = await listEnrollmentsInteractor(repo);
		console.log(rez);
		return res.send(rez);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
