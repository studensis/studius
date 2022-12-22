import { SeminarSuggestionRepository } from '../repository/SeminarSuggestionRepository';
import SeminarSuggestionEntity from '../SeminarSuggestionEntity';

export default async function createSeminarSuggestionInteractor(
    seminarSuggestionRepository: SeminarSuggestionRepository,
    seminarSuggestion: SeminarSuggestionEntity
) {
    let seminarSuggestions = await seminarSuggestionRepository.create(seminarSuggestion);
    return seminarSuggestions;
}