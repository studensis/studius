import { Subject } from '@prisma/client';

export default class SubjectEntity {
	id: number;
	title: string;
	description: string;
	semester: string;       	// enum semester
	status: string;         	// enum status
	content: string;        	// Content

	constructor(props: Subject) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.semester = props.semester;
		this.status = props.status;
		this.content = props.content;
	}
}