import { Status, SubjectRole } from '@prisma/client';

export type EnrollmentEntity = {
	id?: string;
	userId: string;
	subjectId: string;
	enrollmentDate: Date | null;
	roleTitle: SubjectRole;
	status: Status;
};
