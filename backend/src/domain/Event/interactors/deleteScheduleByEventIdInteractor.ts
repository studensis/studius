import { ScheduleRepository } from '../../Schedule/repository/ScheduleRepository';

export default async function deleteScheduleByEventIdInteractor(
	eventId: string,
	scheduleRepository: ScheduleRepository
) {
	let response = await scheduleRepository.deleteByEventId(eventId);
	return response;
}
