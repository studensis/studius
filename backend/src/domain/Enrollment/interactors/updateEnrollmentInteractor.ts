import { EnrollmentEntity } from '../model/EnrollmentEntity';
import { EnrollmentRepository } from '../repository/EnrollmentRepository';

export default async function updateEnrollmentInteractor(
	enrollmentRepository: EnrollmentRepository,
	data: EnrollmentEntity
) {
	let response = await enrollmentRepository.update(data);
	return response;
}
