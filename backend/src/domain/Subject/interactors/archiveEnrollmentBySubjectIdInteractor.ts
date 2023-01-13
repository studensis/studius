import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function archiveEnrollmentBySubjectIdInteractor(
	subjectId: string,
	enrollmentRepo: EnrollmentRepository
) {
	let response = await enrollmentRepo.archiveEnrollmentBySubjectId(subjectId);
	return response;
}
