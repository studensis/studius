import { Express } from 'express';
import createSubjectRouteHandler from '../domain/Subject/routeHandlers/createSubjectRouteHandler';
import createUserRouteHandler from '../domain/User/routeHandlers/createUserRouteHandler';
import getSubjectRouteHandler from '../domain/Subject/routeHandlers/getSubjectRouteHandler';
import getUserRouteHandler from '../domain/User/routeHandlers/getUserRouteHandler';
import listSubjectsRouteHandler from '../domain/Subject/routeHandlers/listSubjectsRouteHandler';
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

	server.route('/subjects').get(listSubjectsRouteHandler);
	server.route('/subjects/:subjectId').get(getSubjectRouteHandler);
	server.route('/subjects').post(createSubjectRouteHandler);
};
