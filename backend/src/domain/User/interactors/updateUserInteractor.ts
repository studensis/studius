import { UserRepository } from '../repository/UserRepository';
import UserEntity from '../UserEntity';

export default async function updateUserInteractor(
    userRepository: UserRepository,
    user: UserEntity
) {
    let updatedUser = await userRepository.update(user);
    return updatedUser;
}