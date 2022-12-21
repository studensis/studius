import { SeminarSuggestionRepository } from '../repository/SeminarSuggestionRepository';
import SeminarSuggestionEntity from '../SeminarSuggestionEntity';

export default async function updateSeminarSuggestionInteractor(
    seminarSuggestionRepository: SeminarSuggestionRepository,
    seminarSuggestion: SeminarSuggestionEntity
) {
    let updatedSeminarSuggestion = await seminarSuggestionRepository.update(seminarSuggestion);
    return updatedSeminarSuggestion;
}
