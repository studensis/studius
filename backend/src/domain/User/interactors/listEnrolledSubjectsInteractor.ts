import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function listEnrolledSubjectsInteractor(
	enrollmentRepository: EnrollmentRepository,
	active: boolean | undefined,
	archived: boolean | undefined,
	userId: string
) {
	let response = await enrollmentRepository.getEnrolledSubjects(
		active,
		archived,
		userId
	);
	return response;
}
