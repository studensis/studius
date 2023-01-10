import contentRouter from '../domain/Content/contentRouter';
import eventRouter from '../domain/Event/eventRouter';
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
	// enrollment: todoRoutine,
	room: roomRouter,
	event: eventRouter,
	post: postRouter,
	seminar: todoRoutine,
	content: contentRouter,
});

export default appRouter;
