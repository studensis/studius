import { EnrollmentEntity } from '../../Enrollment/model/EnrollmentEntity';
import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function enrollUserIneractor(
	enrollmentData: EnrollmentEntity,
	enrollmentRepository: EnrollmentRepository
) {
	let response = await enrollmentRepository.enrollUser(enrollmentData);
	return response;
}
