import { updateUserEntity } from '../model/updateUserEntity';
import { UserRepository } from '../repository/UserRepository';

export default async function updateUserInteractor(
	userRepository: UserRepository,
	user: updateUserEntity
) {
	let updatedUser = await userRepository.update(user);
	return updatedUser;
}
