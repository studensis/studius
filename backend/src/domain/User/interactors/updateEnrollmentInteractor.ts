import { updateEnrollmentEntity } from '../../Enrollment/model/updateEnrollment';
import { UserRepository } from '../repository/UserRepository';

export default async function updateEnrollmentInteractor(
	userRepository: UserRepository,
	newData: updateEnrollmentEntity
) {
	let updatedEnrollment = await userRepository.updateEnrollment(newData);
	return updatedEnrollment;
}
