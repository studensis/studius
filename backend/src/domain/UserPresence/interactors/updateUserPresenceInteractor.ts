import { updateUserPresenceEntity } from '../model/updateUserPresenceEntity';
import { UserPresenceRepository } from '../repository/UserPresenceRepository';

export default async function updateUserPresenceInteractor(
	userPresenceRepository: UserPresenceRepository,
	userPresence: updateUserPresenceEntity
) {
	let updatedUserPresence = await userPresenceRepository.update(userPresence);
	return updatedUserPresence;
}
