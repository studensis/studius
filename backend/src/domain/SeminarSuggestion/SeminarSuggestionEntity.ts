import { SeminarSuggestion, User } from '@prisma/client';
import { Subject } from '@prisma/client';

export default class SeminarSuggestionEntity {
	id: string;
	seminarId: string;   		// Content
	subjectId: string;			// Subject


	constructor(props: SeminarSuggestion) {
		this.id = props.id;
		this.seminarId = props.seminarId;
		this.subjectId = props.subjectId;
	}
}