import { ScheduleRepository } from '../repository/ScheduleRepository';

export default async function archiveScheduleInteractor(
	id: string,
	scheduleRepository: ScheduleRepository
) {
	let response = await scheduleRepository.archive(id);
	return response;
}
