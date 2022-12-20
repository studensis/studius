import { ContentRepository } from '../repository/ContentRepository';

export default async function deleteContentInteractor(
    id: string, 
    contentRepository: ContentRepository
) {
    let response = await contentRepository.delete(id);
    return response;
}