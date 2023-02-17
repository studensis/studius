import { ScheduleRepository } from '../../Schedule/repository/ScheduleRepository';

export default async function archiveScheduleByEventIdInteractor(
	eventId: string,
	scheduleRepository: ScheduleRepository
) {
	let response = await scheduleRepository.archiveByEventId(eventId);
	return response;
}
