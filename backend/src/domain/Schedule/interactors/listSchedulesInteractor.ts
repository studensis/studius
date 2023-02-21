import { paginationType } from '../../pagination/paginationObj';
import { ScheduleRepository } from '../repository/ScheduleRepository';

export default async function listSchedulesInteractor(
	scheduleRepository: ScheduleRepository,
	paginationInfo: paginationType
) {
	let schedules = await scheduleRepository.getAll(paginationInfo);
	return schedules;
}
