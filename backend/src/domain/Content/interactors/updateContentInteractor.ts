import { updateContentEntity } from '../model/updateContentEntity';
import { ContentRepository } from '../repository/ContentRepository';

export default async function updateContentInteractor(
	contentRepository: ContentRepository,
	content: updateContentEntity
) {
	let updatedContent = await contentRepository.update(content);
	return updatedContent;
}
