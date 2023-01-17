import createSeminarSuggestionInteractor from '../interactors/createSeminarSuggestionInteractor';
import deleteSeminarSuggestionInteractor from '../interactors/deleteSeminarSuggestionInteractor';
import getSeminarSuggestionInteractor from '../interactors/getSeminarSuggestionInteractor';
import listSeminarSuggestionsInteractor from '../interactors/listSeminarSuggestionsInteractor';
import updateSeminarSuggestionInteractor from '../interactors/updateSeminarSuggestionInteractor';
import { SeminarSuggestionEntity } from '../model/SeminarSuggestionEntity';
import { updateSeminarSuggestionEntity } from '../model/updateSeminarSuggestionEntity';
import SeminarSuggestionRepositoryPrisma from '../repository/SeminarSuggestionRepositoryPrisma';

const repo = new SeminarSuggestionRepositoryPrisma();
let testSeminarSuggestion: SeminarSuggestionEntity = {
	id: '',
	subjectId: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	eventId: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
};
let newSeminarSuggestion: SeminarSuggestionEntity;
let id: string;

test('SeminarSuggestion create', async () => {
	newSeminarSuggestion = await createSeminarSuggestionInteractor(
		repo,
		testSeminarSuggestion
	);
	expect(newSeminarSuggestion).not.toBeNull();
});

test('SeminarSuggestion update', async () => {
	id = newSeminarSuggestion.id;
	let updateSeminarSuggestion: updateSeminarSuggestionEntity = {
		id: id,
		subjectId: 'updated',
	};
	newSeminarSuggestion = await updateSeminarSuggestionInteractor(
		repo,
		updateSeminarSuggestion
	);
	expect(newSeminarSuggestion).not.toBeNull();
});
test('SeminarSuggestion get', async () => {
	let newSeminarSuggestion: SeminarSuggestionEntity =
		await getSeminarSuggestionInteractor(repo, id);
	expect(newSeminarSuggestion).not.toBeNull();
});

test('SeminarSuggestion list', async () => {
	let izlaz: SeminarSuggestionEntity[] = await listSeminarSuggestionsInteractor(
		repo
	);
	expect(izlaz).not.toBeNull();
});

test('SeminarSuggestion delete', async () => {
	let newSeminarSuggestion: SeminarSuggestionEntity =
		await deleteSeminarSuggestionInteractor(id, repo);
	expect(newSeminarSuggestion).not.toBeNull();
});
