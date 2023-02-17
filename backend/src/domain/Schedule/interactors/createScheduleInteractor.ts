import { ScheduleEntity } from '../model/ScheduleEntity';
import { ScheduleRepository } from '../repository/ScheduleRepository';

export default async function createScheduleInteractor(
	scheduleRepository: ScheduleRepository,
	schedule: ScheduleEntity
) {
	let schedules = await scheduleRepository.create(schedule);
	return schedules;
}
