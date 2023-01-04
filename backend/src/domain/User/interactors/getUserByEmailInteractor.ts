import { UserRepository } from '../repository/UserRepository';

export default async function getUserByEmailInteractor(
	userRepository: UserRepository,
	email: string
) {
	let user = await userRepository.getByEmail(email);
	return user;
}
