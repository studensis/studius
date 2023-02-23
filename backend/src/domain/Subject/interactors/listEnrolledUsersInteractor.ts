import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function listEnrolledUsersInteractor(
	enrollmentRepository: EnrollmentRepository,
	active: boolean | undefined,
	archived: boolean | undefined,
	subjectId: string
) {
	let users = await enrollmentRepository.getEnrolledUsers(
		active,
		archived,
		subjectId
	);
	return users;
}
