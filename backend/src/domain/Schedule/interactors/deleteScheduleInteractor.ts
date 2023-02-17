import { ScheduleRepository } from '../repository/ScheduleRepository';

export default async function deleteScheduleInteractor(
	id: string,
	scheduleRepository: ScheduleRepository
) {
	let response = await scheduleRepository.delete(id);
	return response;
}
