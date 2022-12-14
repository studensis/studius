import { PostRepository } from '../repository/PostRepository';

export default async function getPostInteractor(
	postRepository: PostRepository,
	id: number
) {
	let post = await postRepository.getById(id);
	return post;
}
