import { key } from '../model/compositeKey';
import { EnrollmentRepository } from '../repository/EnrollmentRepository';

export default async function deleteEnrollmentInteractor(
	enrollmentRepository: EnrollmentRepository,
	key: key
) {
	let rez = await enrollmentRepository.delete(key);
	return rez;
}
