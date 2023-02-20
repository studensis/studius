import { AssignmentStatus } from '@prisma/client';
export type approvedAssignmentEntity = {
	id: string;
	title: string;
	description: string | null;
	mentorId: string | null; // Number ????
	contentId: string | null; // Content
	subjectId: string | null; // Subject
	userId: string | null;
	status: AssignmentStatus;
};

// ovo je bilo approvedSeminarEntity pa mozda kao takav ima vise smisla
