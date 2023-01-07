import contentRouter from '../domain/Content/contentRouter';
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
	// enrollment: todoRoutine,
	room: todoRoutine,
	event: todoRoutine,
	// roomTimeEvent: todoRoutine,
	// eventUserPresence: todoRoutine,
	post: todoRoutine,
	seminar: todoRoutine,
	seminarSuggestion: todoRoutine,
	content: contentRouter,
});

export default appRouter;
