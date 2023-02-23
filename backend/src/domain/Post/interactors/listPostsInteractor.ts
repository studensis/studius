import { PostRepository } from '../repository/PostRepository';

export default async function listPostsInteractor(
	postRepository: PostRepository
) {
	let posts = await postRepository.getAll();
	return posts;
}
