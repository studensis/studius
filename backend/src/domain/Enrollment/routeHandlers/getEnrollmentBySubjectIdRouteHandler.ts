import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getEnrollmentBySubjectIdInteractor from '../interactors/getEnrollmentBySubjectIdInteractor';
import EnrollmentRepositoryPrisma from '../repository/EnrollmentRepositoryPrisma';

export default async function getEnrollmentBySubjectIdRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`enrollments/subject/${req.params.subjectId} GET`);

	try {
		let subjectId = req.params.subjectId as string;
		let repo = new EnrollmentRepositoryPrisma();
		let rez = await getEnrollmentBySubjectIdInteractor(repo, subjectId);
		res.send(rez);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
