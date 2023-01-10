import { updatePostEntity } from '../model/updatePostEntity';
import { PostRepository } from '../repository/PostRepository';

export default async function updatePostInteractor(
	postRepository: PostRepository,
	post: updatePostEntity
) {
	let updatedPost = await postRepository.update(post);
	return updatedPost;
}
