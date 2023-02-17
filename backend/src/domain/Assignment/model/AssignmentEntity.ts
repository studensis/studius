import { AssignmentStatus } from '@prisma/client';
export type AssignmentEntity = {
	id: string;
	title: string;
	description?: string | null;
	mentorId?: string | null; // Number ????
	contentId?: string | null; // Content
	subjectId?: string | null; // Subject
	userId?: string | null;
	status?: AssignmentStatus;
};
