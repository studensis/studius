import { PostRepository } from '../../Post/repository/PostRepository';

export default async function listAssignmentPostsInteractor(
	postRepository: PostRepository
) {
	let response = await postRepository.listEntityPosts('SUBJECT');
	return response;
}
