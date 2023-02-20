import ScheduleRepositoryPrisma from '../../Schedule/repository/ScheduleRepositoryPrisma';

export default async function deleteScheduleByRoomIdInteractor(
	roomId: string,
	ScheduleRepo: ScheduleRepositoryPrisma
) {
	let response = await ScheduleRepo.deleteByRoomId(roomId);
	return response;
}
