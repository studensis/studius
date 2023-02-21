import { UserRepository } from '../repository/UserRepository';

export default async function listMenteesInteractor(
	userRepository: UserRepository,
	input: {
		pageNumber: number;
		objectsPerPage: number;
		mentorId: string;
	}
) {
	let response = await userRepository.listMentees(input);
	return response;
}
