import { EnrollmentEntity } from '../../Enrollment/EnrollmentEntity';
import { updateEnrollmentEntity } from '../../Enrollment/updateEnrollment';
import { UserRepository } from '../repository/UserRepository';
import { updateUserEntity } from '../updateUserEntity';

export default async function updateEnrollmentInteractor(
    userRepository: UserRepository,
    newData: EnrollmentEntity
) {
    let updatedEnrollment = await userRepository.updateEnrollment(newData);
    return updatedEnrollment;
}