import { UserRepository } from '../repository/UserRepository';

export default async function getUserInteractor(
	userRepository: UserRepository,
	id: number
) {
	let user = await userRepository.getById(id);
	return user;
}
