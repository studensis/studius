import { Enrollment, User, Subject } from '@prisma/client';
import SubjectEntity from '../Subject/SubjectEntity';

export default class EnrollmentEntity {
	subject: Subject;
    user: User;
    Enrollment_date: Date;
    status: Status;

	constructor(props: Enrollment) {
		this.subject = props.subject;
        this.user = props.user;
        this.Enrollment_date = props.Enrollment_date;
        this.status = props.status;
	}

	
}
