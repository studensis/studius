import { PinnedScheduleRepository } from '../repository/PinnedScheduleRepository';

export default async function deletePinnedScheduleInteractor(
	id: string,
	pinnedScheduleRepository: PinnedScheduleRepository
) {
	let response = await pinnedScheduleRepository.delete(id);
	return response;
}
