import { Semester } from './Semester';
import { Status } from './Status';

export type SubjectEntity = {
	id: string;
	title: string;
	description: string;
	ectsBod: string;
	semester: Semester; // enum semester
	status: Status; // enum status
	contentId: string[]; //bice rijeseno u odvojenom use case-u
};
