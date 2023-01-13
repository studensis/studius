import { SubjectRepository } from '../repository/SubjectRepository';

export default async function archiveEnrollmentBySubjectIdInteractor(
	subjectId: string,
	subjectRepository: SubjectRepository
) {
	let response = await subjectRepository.archiveEnrollmentBySubjectId(
		subjectId
	);
	return response;
}
