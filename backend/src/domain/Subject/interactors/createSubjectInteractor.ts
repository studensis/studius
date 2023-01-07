import { SubjectEntity } from '../model/SubjectEntity';
import { SubjectRepository } from '../repository/SubjectRepository';

export default async function createSubjectInteractor(
	subjectRepository: SubjectRepository,
	subject: SubjectEntity
) {
	let subjects = await subjectRepository.create(subject);
	return subjects;
}
