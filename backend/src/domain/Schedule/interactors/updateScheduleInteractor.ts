import { updateScheduleEntity } from '../model/updateScheduleEntity';
import { ScheduleRepository } from '../repository/ScheduleRepository';

export default async function updateScheduleInteractor(
	scheduleRepository: ScheduleRepository,
	schedule: updateScheduleEntity
) {
	let updatedSchedule = await scheduleRepository.update(schedule);
	return updatedSchedule;
}
