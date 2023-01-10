import { updateSeminarSuggestionEntity } from '../model/updateSeminarSuggestionEntity';
import { SeminarSuggestionRepository } from '../repository/SeminarSuggestionRepository';

export default async function updateSeminarSuggestionInteractor(
	seminarSuggestionRepository: SeminarSuggestionRepository,
	seminarSuggestion: updateSeminarSuggestionEntity
) {
	let updatedSeminarSuggestion = await seminarSuggestionRepository.update(
		seminarSuggestion
	);
	return updatedSeminarSuggestion;
}
