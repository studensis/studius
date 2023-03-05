import { paginationType } from '../../pagination/paginationObj';
import { ContentRepository } from '../repository/ContentRepository';

export default async function listContentsInteractor(
	contentRepository: ContentRepository,
	paginationInfo: paginationType
) {
	let contents = await contentRepository.listPaginated(paginationInfo);
	return contents;
}
