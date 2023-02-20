import createEventInteractor from '../../Event/interactors/createEventInteractor';
import deleteEventInteractor from '../../Event/interactors/deleteEventInteractor';
import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import createSubjectInteractor from '../../Subject/interactors/createSubjectInteractor';
import deleteSubjectInteractor from '../../Subject/interactors/deleteSubjectInteractor';
import { SubjectEntity } from '../../Subject/model/SubjectEntity';
import SubjectRepositoryPrisma from '../../Subject/repository/SubjectRepositoryPrisma';
import createPinnedEventInteractor from '../interactors/createPinnedEventInteractor';
import deletePinnedEventInteractor from '../interactors/deletePinnedEventInteractor';
import getPinnedEventInteractor from '../interactors/getPinnedEventInteractor';
import listPinnedEventsInteractor from '../interactors/listPinnedEventsInteractor';
import updatePinnedEventInteractor from '../interactors/updatePinnedEventInteractor';
import { PinnedEventEntity } from '../model/PinnedEventEntity';
import { updatePinnedEventEntity } from '../model/updatePinnedEventEntity';
import PinnedEventRepositoryPrisma from '../repository/PinnedEventRepositoryPrisma';

const repo = new PinnedEventRepositoryPrisma();
const subjectRepo = new SubjectRepositoryPrisma();
const eventRepo = new EventRepositoryPrisma();

let newPinnedEvent: PinnedEventEntity;
let id: string;
let subjectId: string;
let eventId: string;

//
//
//
// kreiranje Subject-a i Event-a u svrhu testiranja PinnedEvent-a
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
test('PinnedEvent create', async () => {
	subjectId = newSubject.id;
	eventId = newEvent.id;
	newPinnedEvent = await createPinnedEventInteractor(repo, {
		id: '',
		subjectId: subjectId,
		eventId: eventId,
	});
	expect(newPinnedEvent).not.toBeNull();
});

test('PinnedEvent update', async () => {
	id = newPinnedEvent.id;
	let updatePinnedEvent: updatePinnedEventEntity = {
		id: id,
	};
	newPinnedEvent = await updatePinnedEventInteractor(repo, updatePinnedEvent);
	expect(newPinnedEvent).not.toBeNull();
});
test('PinnedEvent get', async () => {
	let newPinnedEvent: PinnedEventEntity = await getPinnedEventInteractor(
		repo,
		id
	);
	expect(newPinnedEvent).not.toBeNull();
});

test('PinnedEvent list', async () => {
	let izlaz: PinnedEventEntity[] = await listPinnedEventsInteractor(repo);
	expect(izlaz).not.toBeNull();
});
//
//
//
// brisanje
test('PinnedEvent delete', async () => {
	let newPinnedEvent: PinnedEventEntity = await deletePinnedEventInteractor(
		id,
		repo
	);
	expect(newPinnedEvent).not.toBeNull();
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
