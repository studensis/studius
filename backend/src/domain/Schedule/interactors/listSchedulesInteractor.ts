import { ScheduleRepository } from '../repository/ScheduleRepository';

export default async function listSchedulesInteractor(
	scheduleRepository: ScheduleRepository
) {
	let schedules = await scheduleRepository.getAll();
	return schedules;
}
