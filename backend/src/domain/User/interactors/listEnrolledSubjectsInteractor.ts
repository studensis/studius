import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function listEnrolledSubjectsInteractor(
	userId: string,
	enrollmentRepository: EnrollmentRepository
) {
	let response = await enrollmentRepository.getEnrolledSubjects(userId);
	return response;
}
