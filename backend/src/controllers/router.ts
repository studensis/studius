import contentRouter from '../domain/Content/contentRouter';
import eventRouter from '../domain/Event/eventRouter';
import eventUserPresenceRouter from '../domain/EventUserPresence/EventUserPresenceRouter';
import postRouter from '../domain/Post/postRouter';
import roomRouter from '../domain/Room/roomRouter';
import roomTimeEventRouter from '../domain/RoomTimeEvent/roomTimeEventRouter';
import seminarSuggestionRouter from '../domain/SeminarSuggestion/seminarSuggestionRouter';
import subjectRouter from '../domain/Subject/subjectRouter';
import userRouter from '../domain/User/userRouter';
import authRouter from '../services/authentication/authRouter';
import { t } from './trpc';

const todoRoutine = t.procedure.query(() => {
	return 'Routine not yet implemented.';
});

// root router to call
const appRouter: any = t.router({
	auth: authRouter,
	user: userRouter,
	subject: subjectRouter,
	// enrollment: todoRoutine,
	room: roomRouter,
	event: eventRouter,
	roomTimeEvent: roomTimeEventRouter,
	eventUserPresence: eventUserPresenceRouter,
	post: postRouter,
	seminar: todoRoutine,
	seminarSuggestion: seminarSuggestionRouter,
	content: contentRouter,
});

export default appRouter;
