import { Role, User } from '@prisma/client';
import { Express } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from './services/user/user.service';

// Kakti API gateway

// https://www.partech.nl/nl/publicaties/2020/07/9-trending-best-practices-for-rest-api-development#

// POST — add new data.
// PUT — replace existing data.
// PATCH — update some existing data fields.
// DELETE — delete existing data.

export default (server: Express) => {
	server.get('/', (req, res) => {
		res.send('Hello World!');
	});

	server.route('/users').get(async (_req, res) => {
		console.log('/users GET');

		try {
			let users = await UserService.getAllUsers();
			return res.send(users);
		} catch {
			return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
		}
	});

	server.route('/users/:userId').get(async (_req, res) => {
		console.log('/users/:userId GET');

		try {
			let id = Number(_req.params.userId);
			let user = await UserService.findById(id);
			return res.send(user);
		} catch {
			return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
		}
	});

	server.route('/users').post(async (_req, res) => {
		console.log('/users POST');

		try {
			let newUser: User = {
				id: 9,
				email: _req.query.email as string,
				password: _req.query.password as string,
				name: _req.query.name as string,
				surname: _req.query.surname as string,
				username: _req.query.username as string,
				JMBAG: _req.query.JMBAG as string,
				avatar_url: _req.query.avatar_url as string,
				role: _req.query.role as Role
			};
			let user = await UserService.createUser(newUser as User);
			return res.send(user);
		} catch {
			return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
		}
	});
};
