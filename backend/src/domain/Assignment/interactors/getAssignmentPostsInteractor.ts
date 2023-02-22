import { PostRepository } from '../../Post/repository/PostRepository';

export default async function getAssignmentPostsInteractor(
	postsRepository: PostRepository,
	assignmentId: string
) {
	let response = await postsRepository.getEntityPosts(
		assignmentId,
		'ASSIGNMENT'
	);
	return response;
}
