import { UserPresenceRepository } from '../../UserPresence/repository/UserPresenceRepository';

export default async function deleteUserPresenceByScheduleIdInteractor(
	scheduleID: string,
	userPresenceRepository: UserPresenceRepository
) {
	let response = await userPresenceRepository.deleteByScheduleId(scheduleID);
	return response;
}
