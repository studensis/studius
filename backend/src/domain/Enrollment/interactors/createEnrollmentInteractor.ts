import { EnrollmentEntity } from '../EnrollmentEntity';
import { EnrollmentRepository } from '../repository/EnrollmentRepository';

export default async function createEnrollmentInteractor(
	enrollmentRepository: EnrollmentRepository,
	data: EnrollmentEntity
) {
	let enrollment = await enrollmentRepository.create(data);
	return enrollment;
}
