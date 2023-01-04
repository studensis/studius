import { EnrollmentEntity } from '../../Enrollment/EnrollmentEntity';
import { UserRepository } from '../repository/UserRepository';

export default async function enrollUserIneractor(
    enrollmentData: EnrollmentEntity, 
    userRepository: UserRepository
) {
    let response = await userRepository.enrollUser(enrollmentData);
    return response;    
}