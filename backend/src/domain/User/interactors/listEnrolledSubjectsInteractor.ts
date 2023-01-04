import { UserRepository } from '../repository/UserRepository';

export default async function listEnrolledSubjectsInteractor(
    userId: string, 
    userRepository: UserRepository
) {
    let response = await userRepository.getEnrolledSubjects(userId);
    return response;
}