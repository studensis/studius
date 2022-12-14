import { ContentRepository } from '../repository/ContentRepository';

export default async function getContentInteractor(
	contentRepository: ContentRepository,
	id: number
) {
	let content = await contentRepository.getById(id);
	return content;
}
