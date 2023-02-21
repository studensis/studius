import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function listEnrolledSubjectsInteractor(
	info: { pageNumber: number; objectsPerPage: number; userId: string },
	enrollmentRepository: EnrollmentRepository
) {
	let response = await enrollmentRepository.getEnrolledSubjects(info);
	return response;
}
