import { Semester, Subject, Status } from '@prisma/client';

export default class SubjectEntity {
	id: string;
	title: string;
	description: string;
	ectsBod: string;
	semester: Semester;       	// enum semester
	status: Status;         	// enum status
	contentId: string[];        	//bice rijeseno u odvojenom use case-u

	constructor(props: Subject) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.ectsBod = props.ectsBod;
		this.semester = props.semester;
		this.status = props.status;
		this.contentId = props.contentId;
	}
}