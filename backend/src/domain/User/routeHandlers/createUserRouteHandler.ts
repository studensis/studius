import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createUserInteractor from '../interactors/createUserInteractor';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';
import UserEntity from '../UserEntity';
import { UserRole } from '../UserRole';

export default async function createUserRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/users POST');

	try {

		let newUser = new UserEntity({
			id : undefined,
			firstname : req.query.firstname as string,
			lastname : req.query.lastname as string,
			password: req.query.password as string,
			jmbag: req.query.jmbag as string,
			email: req.query.email as string,
			mentorID: undefined, 
			userRole: req.query.userRole as UserRole,
		});
		newUser.validate();
		let repo = new UserRepositoryPrisma();
		let user = await createUserInteractor(repo, newUser);
		return res.send(user);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('err');
	}
}
