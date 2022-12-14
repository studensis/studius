import { Seminar, User } from '@prisma/client';
import { Subject } from '@prisma/client';

export default class SeminarEntity {
	id: number;
	title: string;
	description: string;
	mentorId: number;       
	type: string;        
	contentId: number;    // treba class Content
    subject: number;
    user: User;


	constructor(props: Seminar) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.mentorId = props.mentorId;
        this.type = props.type;
        this.contentId = props.contentId;
        this.subjectId = props.subjectId;
        this.user = props.user;
	}
}