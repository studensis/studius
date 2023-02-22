import { PostRepository } from '../../Post/repository/PostRepository';

export default async function getSubjectPostsInteractor(
	postsRepository: PostRepository,
	subjectId: string
) {
	let response = await postsRepository.getEntityPosts(subjectId, 'SUBJECT');
}
