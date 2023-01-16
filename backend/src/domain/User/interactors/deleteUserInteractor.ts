import { EnrollmentRepository } from '../../Enrollment/repository/EnrollmentRepository';
import { UserRepository } from '../repository/UserRepository';

export default async function deleteUserInteractor(
	id: string,
	userRepository: UserRepository,
	enrollmentRepository: EnrollmentRepository
) {
	let deleteEnrollments = await enrollmentRepository.deleteUserEnrollments(id);
	let response = await userRepository.delete(id);
	return response;
}
