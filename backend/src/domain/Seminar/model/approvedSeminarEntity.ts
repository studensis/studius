import { SeminarStatus } from '@prisma/client';
export type approvedSeminarEntity = {
	id: string;
	title: string;
	description: string | null;
	mentorId: string | null; // Number ????
	contentId: string | null; // Content
	subjectId: string | null; // Subject
	userId: string | null;
	status: SeminarStatus;
};
