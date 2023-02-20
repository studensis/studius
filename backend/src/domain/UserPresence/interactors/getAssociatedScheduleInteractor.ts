import { UserPresenceRepository } from '../repository/UserPresenceRepository';

export default async function getAssociatedScheduleInteractor(
	userPresenceRepository: UserPresenceRepository,
	id: string
) {
	let schedules = await userPresenceRepository.getAssociatedSchedule(id);
	return schedules;
}
