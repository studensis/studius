import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getEnrollmentByUserIdInteractor from '../interactors/getEnrollmentByUserIdInteractor';
import EnrollmentRepositoryPrisma from '../repository/EnrollmentRepositoryPrisma';

export default async function getEnrollmentByUserIdRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`enrollments/subject/${req.params.userId} GET`);

	try {
		let userId = req.params.userId as string;
		let repo = new EnrollmentRepositoryPrisma();
		let rez = await getEnrollmentByUserIdInteractor(repo, userId);
		res.send(rez);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}