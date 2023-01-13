import { SubjectRepository } from '../repository/SubjectRepository';

export default async function archiveSubjectInteractor(
	subjectId: string,
	subjectRepository: SubjectRepository
) {
	let response = await subjectRepository.archive(subjectId);
	return response;
}
