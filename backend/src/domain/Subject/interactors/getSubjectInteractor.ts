import { SubjectRepository } from '../repository/SubjectRepository';

export default async function getSubjectInteractor(
	subjectRepository: SubjectRepository,
	id: string
) {
	let subject = await subjectRepository.getById(id);
	return subject;
}
