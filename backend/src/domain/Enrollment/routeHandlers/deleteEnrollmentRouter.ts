import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { key } from '../compositeKey';
import deleteEnrollmentInteractor from '../interactors/deleteEnrollmentInteractor';
import EnrollmentRepositoryPrisma from '../repository/EnrollmentRepositoryPrisma';

export default async function deleteEnrollmentRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`/enrollments DELETE`);

	try {
		let key: key = {
			userId: req.query.userId as string,
			subjectId: req.query.subjectId as string,
		};

		let repo = new EnrollmentRepositoryPrisma();
		let rez = await deleteEnrollmentInteractor(repo, key);
		res.send(rez);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
