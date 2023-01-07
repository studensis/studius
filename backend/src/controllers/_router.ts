import { Express } from 'express';
import createContentRouteHandler from '../domain/Content/routeHandlers/createContentRouteHandler';
import deleteContentRouteHandler from '../domain/Content/routeHandlers/deleteContentRouteHandler';
import getContentRouteHandler from '../domain/Content/routeHandlers/getContentRouteHandler';
import listContentsRouteHandler from '../domain/Content/routeHandlers/listContentsRouteHandler';
import updateContentRouteHandler from '../domain/Content/routeHandlers/updateContentRouteHandler';
import createEnrollmentRouteHandler from '../domain/Enrollment/routeHandlers/createEnrollmentRouteHandler';
import deleteEnrollmentRouteHandler from '../domain/Enrollment/routeHandlers/deleteEnrollmentRouter';
import getEnrollmentBySubjectIdRouteHandler from '../domain/Enrollment/routeHandlers/getEnrollmentBySubjectIdRouteHandler';
import getEnrollmentByUserIdRouteHandler from '../domain/Enrollment/routeHandlers/getEnrollmentByUserIdRouteHandler';
import listEnrollmentsRouteHandler from '../domain/Enrollment/routeHandlers/listEnrollmentsRouteHandler';
import updateEnrollmentRouteHandler from '../domain/Enrollment/routeHandlers/updateEnrollmentRouteHandler';
import createEventRouteHandler from '../domain/Event/routeHandler/createEventRouterHandler';
import deleteEventRouteHandler from '../domain/Event/routeHandler/deleteEventRouteHandler';
import getEventRouteHandler from '../domain/Event/routeHandler/getEventRouterHandler';
import listEventsRouteHandler from '../domain/Event/routeHandler/listEventsRouterHandler';
import updateEventRouteHandler from '../domain/Event/routeHandler/updateEventRouteHandler';
import createEventUserPresenceRouteHandler from '../domain/EventUserPresence/routeHandlers/createEventUserPresenceRouteHandler';
import deleteEventUserPresenceRouteHandler from '../domain/EventUserPresence/routeHandlers/deleteEventUserPresenceRouteHandler';
import getEventUserPresenceRouteHandler from '../domain/EventUserPresence/routeHandlers/getEventUserPresenceRouteHandler';
import listEventUserPresencesRouteHandler from '../domain/EventUserPresence/routeHandlers/listEventUserPresencesRouterHandler';
import updateEventUserPresenceRouteHandler from '../domain/EventUserPresence/routeHandlers/updateEventUserPresenceRouteHandler';
import createPostRouteHandler from '../domain/Post/routerHandlers/createPostRouteHandler';
import deletePostRouteHandler from '../domain/Post/routerHandlers/deletePostRouteHandler';
import getPostRouteHandler from '../domain/Post/routerHandlers/getPostRouteHandler';
import listPostsRouteHandler from '../domain/Post/routerHandlers/listPostsRouteHandler';
import updatePostRouteHandler from '../domain/Post/routerHandlers/updatePostRouteHandler';
import createRoomRouteHandler from '../domain/Room/routeHandlers/createRoomRouteHandler';
import deleteRoomRouteHandler from '../domain/Room/routeHandlers/deleteRoomRouteHandler';
import getRoomRouteHandler from '../domain/Room/routeHandlers/getRoomRouteHandler';
import listRoomsRouteHandler from '../domain/Room/routeHandlers/listRoomRouterHandler';
import updateRoomRouteHandler from '../domain/Room/routeHandlers/updateRoomRouteHandler';
import createRoomTimeEventRouteHandler from '../domain/RoomTimeEvent/routeHandlers/createRoomTimeEventRouteHandler';
import deleteRoomTimeEventRouteHandler from '../domain/RoomTimeEvent/routeHandlers/deleteRoomTimeEventRouteHandler';
import getRoomTimeEventRouteHandler from '../domain/RoomTimeEvent/routeHandlers/getRoomTimeEventRouteHandler';
import listRoomTimeEventsRouteHandler from '../domain/RoomTimeEvent/routeHandlers/listRoomTimeEventsRouterHandler';
import updateRoomTimeEventRouteHandler from '../domain/RoomTimeEvent/routeHandlers/updateRoomTimeEventRouteHandler';
import createSeminarRouteHandler from '../domain/Seminar/routeHandlers/createSeminarRouteHandler';
import deleteSeminarRouteHandler from '../domain/Seminar/routeHandlers/deleteSeminarRouteHandler';
import getSeminarRouteHandler from '../domain/Seminar/routeHandlers/getSeminarRouteHandler';
import listSeminarsRouteHandler from '../domain/Seminar/routeHandlers/listSeminarsRouterHandler';
import updateSeminarRouteHandler from '../domain/Seminar/routeHandlers/updateSeminarRouteHandler';
import createSeminarSuggestionRouteHandler from '../domain/SeminarSuggestion/routeHandlers/createSeminarSuggestionRouteHandler';
import deleteSeminarSuggestionRouteHandler from '../domain/SeminarSuggestion/routeHandlers/deleteSeminarSuggestionRouteHandler';
import getSeminarSuggestionRouteHandler from '../domain/SeminarSuggestion/routeHandlers/getSeminarSuggestionRouteHandler';
import listSeminarSuggestionsRouteHandler from '../domain/SeminarSuggestion/routeHandlers/listSeminarSuggestionsRouterHandler';
import updateSeminarSuggestionRouteHandler from '../domain/SeminarSuggestion/routeHandlers/updateSeminarSuggestionRouteHandler';

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

	// Subject routes
	// server.route('/subjects').get(listSubjectsRouteHandler);
	// server.route('/subjects/:subjectId').get(getSubjectRouteHandler);
	// server.route('/subjects').post(createSubjectRouteHandler);
	// server.route('/subjects/:subjectId').put(updateSubjectRouteHandler);
	// server.route('/subjects/:subjectId').delete(deleteSubjectRouteHandler);
	// server
	// 	.route('/subjects/addContent/:subjectId')
	// 	.patch(addContentRouteHandler);

	// Seminar routes
	server.route('/seminars').get(listSeminarsRouteHandler);
	server.route('/seminars/:seminarId').get(getSeminarRouteHandler);
	server.route('/seminars').post(createSeminarRouteHandler);
	server.route('/seminars/:seminarId').put(updateSeminarRouteHandler);
	server.route('/seminars/:seminarId').delete(deleteSeminarRouteHandler);

	// SeminarSuggestion routes
	server.route('/seminarSuggestions').get(listSeminarSuggestionsRouteHandler);
	server
		.route('/seminarSuggestions/:seminarSuggestionId')
		.get(getSeminarSuggestionRouteHandler);
	server
		.route('/seminarSuggestions')
		.post(createSeminarSuggestionRouteHandler);
	server
		.route('/seminarSuggestions/:seminarSuggestionId')
		.put(updateSeminarSuggestionRouteHandler);
	server
		.route('/seminarSuggestions/:seminarSuggestionId')
		.delete(deleteSeminarSuggestionRouteHandler);

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
	server
		.route('/eventUserPresences/:eventUserPresenceId')
		.get(getEventUserPresenceRouteHandler);
	server
		.route('/eventUserPresences')
		.post(createEventUserPresenceRouteHandler);
	server
		.route('/eventUserPresences/:eventUserPresenceId')
		.put(updateEventUserPresenceRouteHandler);
	server
		.route('/eventUserPresences/:eventUserPresenceId')
		.delete(deleteEventUserPresenceRouteHandler);

	// RoomTimeEvent routes
	server.route('/roomTimeEvents').get(listRoomTimeEventsRouteHandler);
	server
		.route('/roomTimeEvents/:roomTimeEventId')
		.get(getRoomTimeEventRouteHandler);
	server.route('/roomTimeEvents').post(createRoomTimeEventRouteHandler);
	server
		.route('/roomTimeEvents/:roomTimeEventId')
		.put(updateRoomTimeEventRouteHandler);
	server
		.route('/roomTimeEvents/:roomTimeEventId')
		.delete(deleteRoomTimeEventRouteHandler);

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
	server.route('/enrollments').post(createEnrollmentRouteHandler);
	server.route('/enrollments').put(updateEnrollmentRouteHandler);
	server.route('/enrollments').delete(deleteEnrollmentRouteHandler);
	server.route('/enrollments').get(listEnrollmentsRouteHandler);
	server
		.route('/enrollments/user/:userId')
		.get(getEnrollmentByUserIdRouteHandler);
	server
		.route('/enrollments/subject/:subjectId')
		.get(getEnrollmentBySubjectIdRouteHandler);
};
