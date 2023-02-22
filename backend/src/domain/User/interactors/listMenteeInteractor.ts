import { UserRepository } from '../repository/UserRepository';

export default async function listMenteesInteractor(
	userRepository: UserRepository,
	id: string
) {
	let response = await userRepository.listMentees(id);
	return response;
}
