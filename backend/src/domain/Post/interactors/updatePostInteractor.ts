import PostEntity from '../model/PostEntity';
import { PostRepository } from '../repository/PostRepository';

export default async function updatePostInteractor(
	postRepository: PostRepository,
	post: PostEntity
) {
	let updatedPost = await postRepository.update(post);
	return updatedPost;
}
