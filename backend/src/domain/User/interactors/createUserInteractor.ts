import { UserRepository } from '../repository/UserRepository';
import UserEntity from '../UserEntity';

export default async function createUserInteractor(
	userRepository: UserRepository,
	user: UserEntity
) {
	let users = await userRepository.create(user);
	return users;
}
