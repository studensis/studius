import { Status, SubjectRole } from "@prisma/client";


export type updateEnrollmentEntity = {
    userId: string,
    subjectId: string,
    roleTitle?: SubjectRole,
    status?: Status
}