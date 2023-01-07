import { Status, SubjectRole } from "@prisma/client";


export type EnrollmentEntity = { 
    userId: string, 
    subjectId: string, 
    enrollmentDate: Date | null , 
    roleTitle: SubjectRole,
    status: Status
}

