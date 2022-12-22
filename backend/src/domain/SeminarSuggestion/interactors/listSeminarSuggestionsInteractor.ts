import { SeminarSuggestionRepository } from '../repository/SeminarSuggestionRepository';

export default async function listSeminarSuggestionsInteractor(
    seminarSuggestionRepository: SeminarSuggestionRepository
) {
    let seminarSuggestions = await seminarSuggestionRepository.getAll();
    return seminarSuggestions
}