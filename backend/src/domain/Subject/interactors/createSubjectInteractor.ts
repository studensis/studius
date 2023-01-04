import { SubjectRepository } from '../repository/SubjectRepository';
import {SubjectEntity} from '../SubjectEntity';

export default async function createSubjectInteractor(
	subjectRepository: SubjectRepository,
	subject: SubjectEntity
) {
	let subjects = await subjectRepository.create(subject);
	return subjects;
}
