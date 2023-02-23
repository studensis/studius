import { UserRepository } from '../repository/UserRepository';

export default async function listMenteesInteractor(
	userRepository: UserRepository,

	mentorId: string
) {
	let response = await userRepository.listMentees(input);
	return response;
}
