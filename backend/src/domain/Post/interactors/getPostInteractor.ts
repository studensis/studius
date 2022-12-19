import { PostRepository } from '../repository/PostRepository';

export default async function getPostInteractor(
	postRepository: PostRepository,
	id: string
) {
	let post = await postRepository.getById(id);
	return post;
}
