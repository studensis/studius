import { ContentRepository } from '../repository/ContentRepository';
import { updateContentEntity } from '../updateContentEntity';

export default async function updateContentInteractor(
	contentRepository: ContentRepository,
	content: updateContentEntity
) {
	let updatedContent = await contentRepository.update(content);
	return updatedContent;
}
