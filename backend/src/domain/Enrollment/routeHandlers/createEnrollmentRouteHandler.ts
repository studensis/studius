import { Status, SubjectRole } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EnrollmentEntity } from '../EnrollmentEntity';
import createEnrollmentInteractor from '../interactors/createEnrollmentInteractor';
import EnrollmentRepositoryPrisma from '../repository/EnrollmentRepositoryPrisma';

export default async function createEnrollmentRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/enrollments POST');

	try {
		let newEnrollment: EnrollmentEntity = {
			userId: req.query.userId as string,
			subjectId: req.query.subjectId as string,
			enrollmentDate: new Date(
				Date.parse(String(req.query.enrollmentDate))
			) as Date,
			roleTitle: String(req.query.roleTitle).toUpperCase() as SubjectRole,
			status: String(req.query.status).toUpperCase() as Status,
		};

		let repo = new EnrollmentRepositoryPrisma();

		let response = await createEnrollmentInteractor(repo, newEnrollment);

		res.send(response);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
