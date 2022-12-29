import { Enrollment, Status, SubjectRole } from "@prisma/client";


export default class EnrollmentEntity {
    userId: string;
    subjectId: string;
    enrollmentDate: Date;
    roleTitle: SubjectRole;
    status: Status

    constructor (props: Enrollment) {
        this.userId = props.userId,
        this.subjectId = props.subjectId,
        this.enrollmentDate = props.enrollmentDate,
        this.roleTitle = props.roleTitle,
        this.status = props.status
    }

}