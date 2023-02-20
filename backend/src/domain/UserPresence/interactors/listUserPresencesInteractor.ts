import { UserPresenceRepository } from '../repository/UserPresenceRepository';

export default async function listUserPresencesInteractor(
	userPresenceRepository: UserPresenceRepository
) {
	let userPresences = await userPresenceRepository.getAll();
	return userPresences;
}
