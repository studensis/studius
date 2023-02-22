import { updatePinnedScheduleEntity } from '../model/updatePinnedScheduleEntity';
import { PinnedScheduleRepository } from '../repository/PinnedScheduleRepository';

export default async function updatePinnedScheduleInteractor(
	pinnedScheduleRepository: PinnedScheduleRepository,
	pinnedSchedule: updatePinnedScheduleEntity
) {
	let updatedPinnedSchedule = await pinnedScheduleRepository.update(
		pinnedSchedule
	);
	return updatedPinnedSchedule;
}
