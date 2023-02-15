import createEventInteractor from '../../Event/interactors/createEventInteractor';
import deleteEventInteractor from '../../Event/interactors/deleteEventInteractor';
import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import createSubjectInteractor from '../../Subject/interactors/createSubjectInteractor';
import deleteSubjectInteractor from '../../Subject/interactors/deleteSubjectInteractor';
import { SubjectEntity } from '../../Subject/model/SubjectEntity';
import SubjectRepositoryPrisma from '../../Subject/repository/SubjectRepositoryPrisma';
import createSeminarSuggestionInteractor from '../interactors/createSeminarSuggestionInteractor';
import deleteSeminarSuggestionInteractor from '../interactors/deleteSeminarSuggestionInteractor';
import getSeminarSuggestionInteractor from '../interactors/getSeminarSuggestionInteractor';
import listSeminarSuggestionsInteractor from '../interactors/listSeminarSuggestionsInteractor';
import updateSeminarSuggestionInteractor from '../interactors/updateSeminarSuggestionInteractor';
import { SeminarSuggestionEntity } from '../model/SeminarSuggestionEntity';
import { updateSeminarSuggestionEntity } from '../model/updateSeminarSuggestionEntity';
import SeminarSuggestionRepositoryPrisma from '../repository/SeminarSuggestionRepositoryPrisma';

const repo = new SeminarSuggestionRepositoryPrisma();
const subjectRepo = new SubjectRepositoryPrisma();
const eventRepo = new EventRepositoryPrisma();

let newSeminarSuggestion: SeminarSuggestionEntity;
let id: string;
let subjectId: string;
let eventId: string;

//
//
//
// kreiranje Subject-a i Event-a u svrhu testiranja SeminarSuggestion-a
let newSubject: SubjectEntity;
test('Subject create', async () => {
	newSubject = await createSubjectInteractor(subjectRepo, {
		id: '',
		title: Buffer.from(Math.random().toString())
			.toString('base64')
			.substring(5, 15),
		description: 'test',
		ectsBod: '123',
		semester: 'SUMMER',
		status: 'ARCHIVED',
		contentId: [],
	});
	expect(newSubject).not.toBeNull();
});
let newEvent: EventEntity;
test('Event create', async () => {
	newEvent = await createEventInteractor(eventRepo, {
		id: '',
		title: Buffer.from(Math.random().toString())
			.toString('base64')
			.substring(5, 15),
		description: 'test',
		linkedEntity: 'SUBJECT',
		linkedEntityId: '123',
	});
	expect(newEvent).not.toBeNull();
});

//
//
//
//
test('SeminarSuggestion create', async () => {
	subjectId = newSubject.id;
	eventId = newEvent.id;
	newSeminarSuggestion = await createSeminarSuggestionInteractor(repo, {
		id: '',
		subjectId: subjectId,
		eventId: eventId,
	});
	expect(newSeminarSuggestion).not.toBeNull();
});

test('SeminarSuggestion update', async () => {
	id = newSeminarSuggestion.id;
	let updateSeminarSuggestion: updateSeminarSuggestionEntity = {
		id: id,
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
//
//
//
// brisanje
test('SeminarSuggestion delete', async () => {
	let newSeminarSuggestion: SeminarSuggestionEntity =
		await deleteSeminarSuggestionInteractor(id, repo);
	expect(newSeminarSuggestion).not.toBeNull();
});
test('Subject delete', async () => {
	subjectId = newSubject.id;
	let deleteSubject: SubjectEntity = await deleteSubjectInteractor(
		subjectId,
		subjectRepo
	);
	expect(deleteSubject).not.toBeNull();
});
test('Event delete', async () => {
	let deleteEvent: EventEntity = await deleteEventInteractor(
		eventId,
		eventRepo
	);
	expect(deleteEvent).not.toBeNull();
});
