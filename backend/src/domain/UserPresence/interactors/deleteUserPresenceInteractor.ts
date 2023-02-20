import { UserPresenceRepository } from '../repository/UserPresenceRepository';

export default async function deleteUserPresenceInteractor(
	id: string,
	userPresenceRepository: UserPresenceRepository
) {
	let response = await userPresenceRepository.delete(id);
	return response;
}
