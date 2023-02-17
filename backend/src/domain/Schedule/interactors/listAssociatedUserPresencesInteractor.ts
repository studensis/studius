import { ScheduleRepository } from '../repository/ScheduleRepository';

export default async function listAssociatedUserPresencesInteractor(
	scheduleRepository: ScheduleRepository,
	id: string
) {
	let schedules = await scheduleRepository.listAssociatedUserPresences(id);
	return schedules;
}
