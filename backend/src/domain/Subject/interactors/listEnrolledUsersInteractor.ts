import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function listEnrolledUsersInteractor(
	enrollmentRepository: EnrollmentRepository,
	subjectId: string
) {
	let users = await enrollmentRepository.getEnrolledUsers(subjectId);
	return users;
}
