import { PostEntity } from '../model/PostEntity';
import { PostRepository } from '../repository/PostRepository';

export default async function createPostInteractor(
	postRepository: PostRepository,
	post: PostEntity
) {
	let posts = await postRepository.create(post);
	return posts;
}
