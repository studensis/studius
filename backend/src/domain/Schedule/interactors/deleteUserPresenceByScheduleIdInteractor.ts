import { UserPresenceRepository } from '../../UserPresence/repository/UserPresenceRepository';

export default async function deleteUserPresenceByScheduleIDInteractor(
	ScheduleID: string,
	userPresenceRepository: UserPresenceRepository
) {
	let response = await userPresenceRepository.deleteByScheduleID(ScheduleID);
	return response;
}
