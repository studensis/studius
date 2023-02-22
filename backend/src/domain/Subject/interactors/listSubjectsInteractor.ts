import { SubjectRepository } from '../repository/SubjectRepository';

export default async function listSubjectsInteractor(
	subjectRepository: SubjectRepository
) {
	let subjects = await subjectRepository.getAll();
	return subjects;
}
