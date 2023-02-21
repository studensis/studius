import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function listEnrolledUsersInteractor(
	enrollmentRepository: EnrollmentRepository,
	input: {
		pageNumber: number;
		objectsPerPage: number;
		subjectId: string;
	}
) {
	let users = await enrollmentRepository.getEnrolledUsers(input);
	return users;
}
