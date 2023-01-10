import contentRouter from '../domain/Content/contentRouter';
import eventRouter from '../domain/Event/eventRouter';
import eventUserPresenceRouter from '../domain/EventUserPresence/eventUserPresenceRouter';
import postRouter from '../domain/Post/postRouter';
import roomRouter from '../domain/Room/roomRouter';
import subjectRouter from '../domain/Subject/subjectRouter';
import userRouter from '../domain/User/userRouter';
import authRouter from '../services/authentication/authRouter';
import { t } from './trpc';

const todoRoutine = t.procedure.query(() => {
	return 'Routine not yet implemented.';
});

// root router to call
const appRouter = t.router({
	auth: authRouter,
	user: userRouter,
	subject: subjectRouter,
	room: roomRouter,
	event: eventRouter,
	post: postRouter,
	seminar: todoRoutine,
	content: contentRouter,
	// roomTimeEvent: roomTimeEventRouter,
	eventUserPresence: eventUserPresenceRouter,
});

export default appRouter;
