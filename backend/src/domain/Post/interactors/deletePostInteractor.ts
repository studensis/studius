import { PostRepository } from '../repository/PostRepository';

export default async function deletePostInteractor(
    id: string, 
    postRepository: PostRepository
) {
    let response = await postRepository.delete(id);
    return response;
}