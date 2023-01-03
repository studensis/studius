import { UserRepository } from '../repository/UserRepository';
import { updateUserEntity } from '../updateUserEntity';

export default async function updateUserInteractor(
    userRepository: UserRepository,
    user: updateUserEntity
) {
    let updatedUser = await userRepository.update(user);
    return updatedUser;
}