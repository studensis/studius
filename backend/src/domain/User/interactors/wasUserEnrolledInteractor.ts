import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function wasUserEnrolledInteractor(
	enrollmentRepository: EnrollmentRepository,
	userId: string,
	subjectId: string
) {
	let wasEnrolled = await enrollmentRepository.wasUserEnrolled(
		userId,
		subjectId
	);
	return wasEnrolled;
}
