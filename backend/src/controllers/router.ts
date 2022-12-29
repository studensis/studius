import userRouter from '../domain/User/userRouter';
import authRouter from './Authentication/authRouter';
import postExampleRouter from './PostExample/postExampleRouter';
import { t } from './trpc';

const todoRoutine = t.procedure.query(() => {
	return 'Routine not yet implemented.';
});

// root router to call
const appRouter = t.router({
	postExample: postExampleRouter,
	auth: authRouter,
	user: userRouter,
	subject: todoRoutine,
	// enrollment: todoRoutine,
	room: todoRoutine,
	event: todoRoutine,
	// roomTimeEvent: todoRoutine,
	// eventUserPresence: todoRoutine,
	post: todoRoutine,
	seminar: todoRoutine,
	seminarSuggestion: todoRoutine,
	content: todoRoutine,
});

export default appRouter;
