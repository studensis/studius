import { AssignmentStatus, AssignmentType, Status } from '@prisma/client';
export type AssignmentEntity = {
	id: string;
	title: string;
	description: string;
	mentorId?: string | null; // Number ????
	contentId?: string | null; // Content
	subjectId?: string | null; // Subject
	deadline?: Date | null;
	type: AssignmentType;
	userId?: string | null;
	assignmentStatus?: AssignmentStatus;
	status: Status;
};
