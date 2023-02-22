import { paginationType } from '../../pagination/paginationObj';
import { ScheduleRepository } from '../repository/ScheduleRepository';

export default async function listPaginatedSchedulesInteractor(
	scheduleRepository: ScheduleRepository,
	paginationInfo: paginationType
) {
	let schedules = await scheduleRepository.listPaginated(paginationInfo);
	return schedules;
}
