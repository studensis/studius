import { PinnedEventRepository } from '../repository/PinnedEventRepository';

export default async function deletePinnedEventInteractor(
	id: string,
	pinnedEventRepository: PinnedEventRepository
) {
	let response = await pinnedEventRepository.delete(id);
	return response;
}
