import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function isUserEnrolledInteractor(
	enrollmentRepository: EnrollmentRepository,
	userId: string,
	subjectId: string
) {
	let isEnrolled = await enrollmentRepository.isUserEnrolled(userId, subjectId);
	return isEnrolled;
}
