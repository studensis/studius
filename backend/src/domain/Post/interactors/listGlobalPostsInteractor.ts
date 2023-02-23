import { PostRepository } from '../../Post/repository/PostRepository';

export default async function listGlobalPostsInteractor(
	postRepository: PostRepository
) {
	let response = await postRepository.listEntityPosts('POST');
	return response;
}
