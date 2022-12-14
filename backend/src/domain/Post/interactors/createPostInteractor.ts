import { PostRepository } from '../repository/PostRepository';
import PostEntity from '../PostEntity';

export default async function createPostInteractor(
	postRepository: PostRepository,
	post: PostEntity
) {
	let posts = await postRepository.create(post);
	return posts;
}
