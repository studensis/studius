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
import updateSubjectRouteHandler from '../domain/Subject/routeHandlers/updateSubjectRouteHandler';
import deleteSubjectRouteHandler from '../domain/Subject/routeHandlers/deleteSubjectRouteHandler';
import updateSeminarRouteHandler from '../domain/Seminar/routeHandlers/updateSeminarRouteHandler';
import deleteSeminarRouteHandler from '../domain/Seminar/routeHandlers/deleteSeminarRouteHandler';
import updateContentRouteHandler from '../domain/Content/routeHandlers/updateContentRouteHandler';
import deleteContentRouteHandler from '../domain/Content/routeHandlers/deleteContentRouteHandler';
import updatePostRouteHandler from '../domain/Post/routerHandlers/updatePostRouteHandler';
import deletePostRouteHandler from '../domain/Post/routerHandlers/deletePostRouteHandler';
import updateEventRouteHandler from '../domain/Event/routeHandler/updateEventRouteHandler';
import deleteEventRouteHandler from '../domain/Event/routeHandler/deleteEventRouteHandler';
import listSeminarSuggestionsRouteHandler from '../domain/SeminarSuggestion/routeHandlers/listSeminarSuggestionsRouterHandler';
import getSeminarSuggestionRouteHandler from '../domain/SeminarSuggestion/routeHandlers/getSeminarSuggestionRouteHandler';
import createSeminarSuggestionRouteHandler from '../domain/SeminarSuggestion/routeHandlers/createSeminarSuggestionRouteHandler';
import updateSeminarSuggestionRouteHandler from '../domain/SeminarSuggestion/routeHandlers/updateSeminarSuggestionRouteHandler';
import deleteSeminarSuggestionRouteHandler from '../domain/SeminarSuggestion/routeHandlers/deleteSeminarSuggestionRouteHandler';
import listRoomsRouteHandler from '../domain/Room/routeHandlers/listRoomRouterHandler';
import getRoomRouteHandler from '../domain/Room/routeHandlers/getRoomRouteHandler';
import createRoomRouteHandler from '../domain/Room/routeHandlers/createRoomRouteHandler';
import updateRoomRouteHandler from '../domain/Room/routeHandlers/updateRoomRouteHandler';
import deleteRoomRouteHandler from '../domain/Room/routeHandlers/deleteRoomRouteHandler';
import listEventUserPresencesRouteHandler from '../domain/EventUserPresence/routeHandlers/listEventUserPresencesRouterHandler';
import getEventUserPresenceRouteHandler from '../domain/EventUserPresence/routeHandlers/getEventUserPresenceRouteHandler';
import createEventUserPresenceRouteHandler from '../domain/EventUserPresence/routeHandlers/createEventUserPresenceRouteHandler';
import updateEventUserPresenceRouteHandler from '../domain/EventUserPresence/routeHandlers/updateEventUserPresenceRouteHandler';
import deleteEventUserPresenceRouteHandler from '../domain/EventUserPresence/routeHandlers/deleteEventUserPresenceRouteHandler';
import createEnrollmentRouteHandler from '../domain/Enrollment/routeHandlers/createEnrollmentRouteHandler';
import updateEnrollmentRouteHandler from '../domain/Enrollment/routeHandlers/updateEnrollmentRouteHandler';
import deleteEnrollmentRouteHandler from '../domain/Enrollment/routeHandlers/deleteEnrollmentRouter';
import listEnrollmentsRouteHandler from '../domain/Enrollment/routeHandlers/listEnrollmentsRouteHandler';
import getEnrollmentByUserIdRouteHandler from '../domain/Enrollment/routeHandlers/getEnrollmentByUserIdRouteHandler';
import getEnrollmentBySubjectIdRouteHandler from '../domain/Enrollment/routeHandlers/getEnrollmentBySubjectIdRouteHandler';

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

	// User routes
	server.route('/users').get(listUsersRouteHandler);
	server.route('/users/:userId').get(getUserRouteHandler);
	server.route('/users').post(createUserRouteHandler);
	server.route('/users/:userId').put(updateUserRouteHandler);
	server.route('/users/:userId').delete(deleteUserRouteHandler);

	// Subject routes
	server.route('/subjects').get(listSubjectsRouteHandler);
	server.route('/subjects/:subjectId').get(getSubjectRouteHandler);
	server.route('/subjects').post(createSubjectRouteHandler);
	server.route('/subjects/:subjectId').put(updateSubjectRouteHandler);
	server.route('/subjects/:subjectId').delete(deleteSubjectRouteHandler);

	// Seminar routes
	server.route('/seminars').get(listSeminarsRouteHandler);
	server.route('/seminars/:seminarId').get(getSeminarRouteHandler);
	server.route('/seminars').post(createSeminarRouteHandler);
	server.route('/seminars/:seminarId').put(updateSeminarRouteHandler);
	server.route('/seminars/:seminarId').delete(deleteSeminarRouteHandler);

	// SeminarSuggestion routes
	server.route('/seminarSuggestions').get(listSeminarSuggestionsRouteHandler);
	server.route('/seminarSuggestions/:seminarSuggestionId').get(getSeminarSuggestionRouteHandler);
	server.route('/seminarSuggestions').post(createSeminarSuggestionRouteHandler);
	server.route('/seminarSuggestions/:seminarSuggestionId').put(updateSeminarSuggestionRouteHandler);
	server.route('/seminarSuggestions/:seminarSuggestionId').delete(deleteSeminarSuggestionRouteHandler);

	// Post routes
	server.route('/posts').get(listPostsRouteHandler);
	server.route('/posts/:postId').get(getPostRouteHandler);
	server.route('/posts').post(createPostRouteHandler);
	server.route('/posts/:postId').put(updatePostRouteHandler);
	server.route('/posts/:postId').delete(deletePostRouteHandler);
	
	// Event routes
	server.route('/events').get(listEventsRouteHandler);
	server.route('/events/:eventId').get(getEventRouteHandler);
	server.route('/events').post(createEventRouteHandler);
	server.route('/events/:eventId').put(updateEventRouteHandler);
	server.route('/events/:eventId').delete(deleteEventRouteHandler);

	// EventUserPresence routes
	server.route('/eventUserPresences').get(listEventUserPresencesRouteHandler);
	server.route('/eventUserPresences/:eventUserPresenceId').get(getEventUserPresenceRouteHandler);
	server.route('/eventUserPresences').post(createEventUserPresenceRouteHandler); 
	server.route('/eventUserPresences/:eventUserPresenceId').put(updateEventUserPresenceRouteHandler);
	server.route('/eventUserPresences/:eventUserPresenceId').delete(deleteEventUserPresenceRouteHandler);
	
	// Content routes
	server.route('/contents').get(listContentsRouteHandler);
	server.route('/contents/:contentId').get(getContentRouteHandler);
	server.route('/contents').post(createContentRouteHandler); 
	server.route('/contents/:contentId').put(updateContentRouteHandler);
	server.route('/contents/:contentId').delete(deleteContentRouteHandler);

	// Room routes
	server.route('/rooms').get(listRoomsRouteHandler);
	server.route('/rooms/:roomId').get(getRoomRouteHandler);
	server.route('/rooms').post(createRoomRouteHandler); 
	server.route('/rooms/:roomId').put(updateRoomRouteHandler);
	server.route('/rooms/:roomId').delete(deleteRoomRouteHandler);

	// Enrollment routes
	server.route('/enrollment').post(createEnrollmentRouteHandler);
	server.route('/enrollment').put(updateEnrollmentRouteHandler);
	server.route('/enrollment').delete(deleteEnrollmentRouteHandler);
	server.route('/enrollments').get(listEnrollmentsRouteHandler);
	server.route('/enrollments/user/:userId').get(getEnrollmentByUserIdRouteHandler);
	server.route('/enrollments/subject/:subjectId').get(getEnrollmentBySubjectIdRouteHandler);


};
