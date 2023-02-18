import { AssignmentStatus, AssignmentType, Status } from '@prisma/client';

export type updateAssignmentEntity = {
	id: string;
	title?: string;
	description?: string;
	mentorId?: string; // Number ????
	type?: AssignmentType;
	deadline?: Date | null;
	contentId?: string; // Content
	subjectId?: string; // Subject
	userId?: string;
	assignmentStatus?: AssignmentStatus;
	status?: Status;
};
