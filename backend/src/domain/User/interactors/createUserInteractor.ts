import { UserEntity } from '../model/UserEntity';
import { UserRepository } from '../repository/UserRepository';

export default async function createUserInteractor(
	userRepository: UserRepository,
	user: UserEntity
) {
	let users = await userRepository.create(user);
	return users;
}
