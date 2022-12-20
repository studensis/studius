import { ContentRepository } from '../repository/ContentRepository';
import ContentEntity from '../ContentEntity';

export default async function updateContentInteractor(
    contentRepository: ContentRepository,
    content: ContentEntity
) {
    let updatedContent = await contentRepository.update(content);
    return updatedContent;
}
