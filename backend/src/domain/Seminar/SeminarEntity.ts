import { Seminar, User } from '@prisma/client';
import { Subject } from '@prisma/client';

export default class SeminarEntity {
	id: number;
	title: string;
	description: string;
	mentorId: string;       	// Number ????
	type: string;
	content: string;    		// Content
	subject: string;			// Subject
	user: string;				// User


	constructor(props: Seminar) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.mentorId = props.mentorId;
		this.type = props.type;
		this.content = props.contentId;
		this.subject = props.subjectId;
		this.user = props.user;
	}
}