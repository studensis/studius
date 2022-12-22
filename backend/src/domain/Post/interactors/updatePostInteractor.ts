import { PostRepository } from '../repository/PostRepository';
import PostEntity from '../PostEntity';

export default async function updatePostInteractor(
    postRepository: PostRepository,
    post: PostEntity
) {
    let updatedPost = await postRepository.update(post);
    return updatedPost;
}
