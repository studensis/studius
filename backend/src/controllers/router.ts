import { Express } from 'express';
import createSubjectRouteHandler from '../domain/Subject/routeHandlers/createSubjectRouteHandler';
import createUserRouteHandler from '../domain/User/routeHandlers/createUserRouteHandler';
import getSubjectRouteHandler from '../domain/Subject/routeHandlers/getSubjectRouteHandler';
import getUserRouteHandler from '../domain/User/routeHandlers/getUserRouteHandler';
import listSubjectsRouteHandler from '../domain/Subject/routeHandlers/listSubjectsRouteHandler';
import listUsersRouteHandler from '../domain/User/routeHandlers/listUsersRouteHandler';
import listSeminarsRouteHandler from '../domain/Seminar/routeHandlers/listSeminarsRouterHandler';
import createSeminarRouteHandler from '../domain/Seminar/routeHandlers/createSeminarRouteHandler';
import getSeminarRouteHandler from '../domain/Seminar/routeHandlers/getSeminarRouteHandler';
import listPostsRouteHandler from '../domain/Post/routerHandlers/listPostsRouteHandler';
import getPostRouteHandler from '../domain/Post/routerHandlers/getPostRouteHandler';
import createPostRouteHandler from '../domain/Post/routerHandlers/createPostRouteHandler';
import listEventsRouteHandler from '../domain/Event/routeHandler/listEventsRouterHandler';
import getEventRouteHandler from '../domain/Event/routeHandler/getEventRouterHandler';
import createEventRouteHandler from '../domain/Event/routeHandler/createEventRouterHandler';
import listContentsRouteHandler from '../domain/Content/routeHandlers/listContentsRouteHandler';
import getContentRouteHandler from '../domain/Content/routeHandlers/getContentRouteHandler';
import createContentRouteHandler from '../domain/Content/routeHandlers/createContentRouteHandler';
import updateUserRouteHandler from '../domain/User/routeHandlers/updateUserRouteHandler';
import deleteUserRouteHandler from '../domain/User/routeHandlers/deleteUserRouteHandler';

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

	// user routes
	server.route('/users').get(listUsersRouteHandler);
	server.route('/users/:userId').get(getUserRouteHandler);
	server.route('/users').post(createUserRouteHandler);
	server.route('/users/update').post(updateUserRouteHandler);
	server.route('/users/:userEmail/delete').post(deleteUserRouteHandler);

	//subject routes
	server.route('/subjects').get(listSubjectsRouteHandler);
	server.route('/subjects/:subjectId').get(getSubjectRouteHandler);
	server.route('/subjects').post(createSubjectRouteHandler);

	// seminar routes
	server.route('/seminars').get(listSeminarsRouteHandler);
	server.route('/seminars/:seminarId').get(getSeminarRouteHandler);
	server.route('/seminars').post(createSeminarRouteHandler);

	// post routes
	server.route('/posts').get(listPostsRouteHandler);
	server.route('/posts/:postId').get(getPostRouteHandler);
	server.route('/posts').post(createPostRouteHandler);
	
	/* 
	// event routes
	server.route('/events').get(listEventsRouteHandler);
	server.route('/events/:eventId').get(getEventRouteHandler);
	server.route('/events').post(createEventRouteHandler);

	// content routes
	server.route('/contents').get(listContentsRouteHandler);
	server.route('/contents/:contentId').get(getContentRouteHandler);
	server.route('/contents').post(createContentRouteHandler); */
};
