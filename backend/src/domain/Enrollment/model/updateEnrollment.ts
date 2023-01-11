import { Status, SubjectRole } from '@prisma/client';

export type updateEnrollmentEntity = {
	id?: string;
	userId: string;
	subjectId: string;
	roleTitle?: SubjectRole;
	status?: Status;
};
