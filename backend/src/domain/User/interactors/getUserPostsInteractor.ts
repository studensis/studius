import { PostRepository } from '../../Post/repository/PostRepository';

export default async function getUserPostsInteractor(
	postRepository: PostRepository,
	userId: string
) {
	let response = await postRepository.getEntityPosts(userId, 'USER');
	return response;
}
