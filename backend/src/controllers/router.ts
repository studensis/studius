import AssignmentRouter from '../domain/Assignment/assignmentRouter';
import contentRouter from '../domain/Content/contentRouter';
import eventRouter from '../domain/Event/eventRouter';
import pinnedScheduleRouter from '../domain/PinnedSchedule/pinnedScheduleRouter';
import postRouter from '../domain/Post/postRouter';
import roomRouter from '../domain/Room/roomRouter';
import subjectRouter from '../domain/Subject/subjectRouter';
import userRouter from '../domain/User/userRouter';
import userPresenceRouter from '../domain/UserPresence/userPresenceRouter';
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
	assignment: AssignmentRouter,
	pinnedSchedule: pinnedScheduleRouter,
	content: contentRouter,
	// schedule: scheduleRouter,		// kroz eventove -> schedule
	userPresence: userPresenceRouter,
});

export default appRouter;
