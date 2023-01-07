import SeminarSuggestionEntity from '../model/SeminarSuggestionEntity';
import { SeminarSuggestionRepository } from '../repository/SeminarSuggestionRepository';

export default async function updateSeminarSuggestionInteractor(
	seminarSuggestionRepository: SeminarSuggestionRepository,
	seminarSuggestion: SeminarSuggestionEntity
) {
	let updatedSeminarSuggestion = await seminarSuggestionRepository.update(
		seminarSuggestion
	);
	return updatedSeminarSuggestion;
}
