import { ScheduleRepository } from '../repository/ScheduleRepository';

export default async function getScheduleInteractor(
	scheduleRepository: ScheduleRepository,
	id: string
) {
	let schedules = await scheduleRepository.getById(id);
	return schedules;
}
