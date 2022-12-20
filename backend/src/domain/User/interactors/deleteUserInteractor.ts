import { UserRepository } from '../repository/UserRepository';

export default async function deleteUserInteractor(
    id: string, 
    userRepository: UserRepository
) {
    let response = await userRepository.delete(id);
    return response;
}