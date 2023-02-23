import { PostRepository } from '../../Post/repository/PostRepository';

export default async function listUserPostsInteractor(
	postRepository: PostRepository
) {
	let response = await postRepository.listEntityPosts('USER');
	return response;
}
