import { ContentEntity } from '../model/ContentEntity';
import { ContentRepository } from '../repository/ContentRepository';

export default async function createContentInteractor(
	contentRepository: ContentRepository,
	content: ContentEntity
) {
	let contents = await contentRepository.create(content);
	return contents;
}
