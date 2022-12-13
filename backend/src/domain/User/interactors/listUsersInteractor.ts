import { UserRepository } from '../repository/UserRepository';

export default async function listUsersInteractor(
	userRepository: UserRepository
) {
	let users = await userRepository.getAll();
	return users;
}
