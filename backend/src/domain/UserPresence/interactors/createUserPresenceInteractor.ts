import { UserPresenceEntity } from '../model/UserPresenceEntity';
import { UserPresenceRepository } from '../repository/UserPresenceRepository';

export default async function createUserPresenceInteractor(
	userPresenceRepository: UserPresenceRepository,
	userPresence: UserPresenceEntity
) {
	let userPresences = await userPresenceRepository.create(userPresence);
	return userPresences;
}
