import { ContentRepository } from '../repository/ContentRepository';

export default async function listContentsInteractor(
	contentRepository: ContentRepository
) {
	let contents = await contentRepository.getAll();
	return contents;
}
