import { Seminar, User } from '@prisma/client';
import { Subject } from '@prisma/client';
import { User } from '@prisma/client';

export default class SeminarEntity {
	id: number;
	title: string;
	description: string;
	mentorId: string;       
	type: string;        
	content: string;    // treba class Content
    subject: Subject;
    user: User;


	constructor(props: Seminar) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.mentorId = props.mentorId;
        this.type = props.type;
        this.content = props.content;
        this.subject = props.subject;
        this.user = props.user;
	}
}