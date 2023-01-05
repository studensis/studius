import { Status, SubjectRole } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EnrollmentEntity } from '../EnrollmentEntity';
import updateEnrollmentInteractor from '../interactors/updateEnrollmentInteractor';
import EnrollmentRepositoryPrisma from '../repository/EnrollmentRepositoryPrisma';

export default async function updateEnrollmentRouteHandler(
	req: Request,
	res: Response
) {
	console.log('enrollments PUT');

	try {
		let newData: EnrollmentEntity = {
			userId: req.query.userId as string,
			subjectId: req.query.subjectId as string,
			enrollmentDate: new Date(
				Date.parse(String(req.query.enrollmentDate))
			) as Date,
			roleTitle: String(req.query.roleTitle).toUpperCase() as SubjectRole,
			status: String(req.query.status).toUpperCase() as Status,
		};

		let repo = new EnrollmentRepositoryPrisma();
		let rez = await updateEnrollmentInteractor(repo, newData);

		res.send(rez);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
