import { UserPresenceRepository } from '../repository/UserPresenceRepository';

export default async function getUserPresenceInteractor(
	userPresenceRepository: UserPresenceRepository,
	id: string
) {
	let userPresences = await userPresenceRepository.getById(id);
	return userPresences;
}
