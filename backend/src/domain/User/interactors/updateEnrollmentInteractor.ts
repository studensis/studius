import { updateEnrollmentEntity } from '../../Enrollment/model/updateEnrollmentEntity';
import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';

export default async function updateEnrollmentInteractor(
	enrollmentRepository: EnrollmentRepository,
	newData: updateEnrollmentEntity
) {
	let updatedEnrollment = await enrollmentRepository.updateEnrollment(newData);
	return updatedEnrollment;
}
