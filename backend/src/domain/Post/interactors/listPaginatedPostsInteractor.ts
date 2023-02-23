import { paginationType } from '../../pagination/paginationObj';
import { PostRepository } from '../repository/PostRepository';

export default async function listPostsInteractor(
	postRepository: PostRepository,
	paginationInfo: paginationType
) {
	let posts = await postRepository.listPaginated(paginationInfo);
	return posts;
}
