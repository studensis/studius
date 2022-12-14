import { Express } from 'express';
import createUserRouteHandler from '../domain/User/routeHandlers/createUserRouteHandler';
import getUserRouteHandler from '../domain/User/routeHandlers/getUserRouteHandler';
import listUsersRouteHandler from '../domain/User/routeHandlers/listUsersRouteHandler';

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

	server.route('/users').get(listUsersRouteHandler);
	server.route('/users/:userId').get(getUserRouteHandler);
	server.route('/users').post(createUserRouteHandler);
	//server.route('/users/:userId/update').post(updateUserRouteHandler);
};
