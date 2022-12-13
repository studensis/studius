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
			id: undefined,
			email: req.query.email as string,
			password: req.query.password as string,
			name: req.query.name as string,
			surname: req.query.surname as string,
			username: req.query.username as string,
			JMBAG: req.query.JMBAG as string,
			avatar_url: req.query.avatar_url as string,
			role: UserRole.STUDENT
		});
		newUser.validate();
		let repo = new UserRepositoryPrisma();
		let user = await createUserInteractor(repo, newUser);
		return res.send(user);
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
