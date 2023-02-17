import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';

export default async function deleteEnrollmentBySubjectIdInteractor(
	subjectId: string,
	enrollmentRepo: EnrollmentRepositoryPrisma
) {
	let response = await enrollmentRepo.deleteSubjectEnrollments(subjectId);
	return response;
}
