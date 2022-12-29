import { Subject } from '@prisma/client';
import {Semester} from "./Semester"
import {Status} from "./Status"


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

	validate() {
		
		if (!this.title) {
			console.log('ERROR title');
			throw new Error('invalid title');
		}
		if (!this.ectsBod || (parseInt(this.ectsBod) < 0 || parseInt(this.ectsBod) > 10)) {
			console.log('ERROR ectsBod');
			throw new Error('invalid ectsBod');
		}
		if (!this.semester || (this.semester !== "SUMMER" && this.semester !== "WINTER")) {
			console.log('ERROR semester');
			throw new Error('invalid semester');
		}
		if (!this.status || (this.status !== "ACTIVE" && this.status !== "ARCHIVED")) {
			console.log('ERROR status');
			throw new Error('invalid status');
		}
		
	}
}