import { ContentRepository } from '../repository/ContentRepository';
import ContentEntity from '../ContentEntity';

export default async function createContentInteractor(
	contentRepository: ContentRepository,
	content: ContentEntity
) {
	let contents = await contentRepository.create(content);
	return contents;
}
