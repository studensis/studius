import { SeminarSuggestionRepository } from '../repository/SeminarSuggestionRepository';

export default async function getSeminarSuggestionInteractor(
    seminarSuggestionRepository: SeminarSuggestionRepository,
    id: string
) {
    let seminarSuggestions = await seminarSuggestionRepository.getById(id);
    return seminarSuggestions
}
