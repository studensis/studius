import { AssignmentStatus } from '@prisma/client';

export type updateAssignmentEntity = {
	id: string;
	title?: string;
	description?: string;
	mentorId?: string; // Number ????
	type?: string;
	contentId?: string; // Content
	subjectId?: string; // Subject
	userId?: string;
	status?: AssignmentStatus;
};
