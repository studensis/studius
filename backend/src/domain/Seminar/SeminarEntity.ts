import { Seminar, User } from '@prisma/client';
import { Subject } from '@prisma/client';

export default class SeminarEntity {
	id: string;
	title: string;
	description: string;
	mentorId: string;       	// Number ????
	type: string;
	contentId: string;    		// Content
	subjectId: string;			// Subject
	userId: string;				// User


	constructor(props: Seminar) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.mentorId = props.mentorId;
		this.type = props.type;
		this.contentId = props.contentId;
		this.subjectId = props.subjectId;
		this.userId = props.userId;
	}
}