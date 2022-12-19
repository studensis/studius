import { UserRepository } from '../repository/UserRepository';

export default async function deleteUserInteractor(
    email: string, 
    userRepository: UserRepository
) {
    let response = await userRepository.delete(email);
    return response;
}