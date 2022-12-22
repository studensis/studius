import { SeminarSuggestionRepository } from '../repository/SeminarSuggestionRepository';

export default async function deleteSeminarSuggestionInteractor(
    id: string, 
    seminarSuggestionRepository: SeminarSuggestionRepository
) {
    let response = await seminarSuggestionRepository.delete(id);
    return response;
}