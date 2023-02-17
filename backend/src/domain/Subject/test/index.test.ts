import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
import createEventInteractor from '../../Event/interactors/createEventInteractor';
import deleteEventInteractor from '../../Event/interactors/deleteEventInteractor';
import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import createPinnedEventInteractor from '../../PinnedEvent/interactors/createPinnedEventInteractor';
import deletePinnedEventInteractor from '../../PinnedEvent/interactors/deletePinnedEventInteractor';
import { PinnedEventEntity } from '../../PinnedEvent/model/PinnedEventEntity';
import PinnedEventRepositoryPrisma from '../../PinnedEvent/repository/PinnedEventRepositoryPrisma';
import createUserInteractor from '../../User/interactors/createUserInteractor';
import deleteUserInteractor from '../../User/interactors/deleteUserInteractor';
import { UserEntity } from '../../User/model/UserEntity';
import UserRepositoryPrisma from '../../User/repository/UserRepositoryPrisma';
import createSubjectInteractor from '../interactors/createSubjectInteractor';
import deleteSubjectInteractor from '../interactors/deleteSubjectInteractor';
import getSubjectInteractor from '../interactors/getSubjectInteractor';
import listPinnedEventsInteractor from '../interactors/listPinnedEventsInteractor';
import listSubjectsInteractor from '../interactors/listSubjectsInteractor';
import updateSubjectInteractor from '../interactors/updateSubjectInteractor';
import { SubjectEntity } from '../model/SubjectEntity';
import { updateSubjectEntity } from '../model/updateSubjectEntity';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';

const subjectRepo = new SubjectRepositoryPrisma();
let enrollmentRepo = new EnrollmentRepositoryPrisma();
let userRepo = new UserRepositoryPrisma();
let pinnedEventRepo = new PinnedEventRepositoryPrisma();
let eventRepo = new EventRepositoryPrisma();
let testSubject: SubjectEntity = {
	id: '',
	title: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	description: '',
	ectsBod: '123',
	contentId: [],
	status: 'ACTIVE',
	semester: 'SUMMER',
};
let newSubject: SubjectEntity;
let newUser: UserEntity;
let subjectId: string;
let userId: string;
let pinnedEventId: string;
let eventId: string;

//
//
//
//
// kreacija User-a potrebnog za Subject CRUD
test('User create', async () => {
	newUser = await createUserInteractor(userRepo, {
		id: '',
		password: '123456789',
		firstname: 'test',
		lastname: 'testic',
		email:
			Buffer.from(Math.random().toString())
				.toString('base64')
				.substring(5, 15) + '@fer.hr',
		userRole: 'DEFAULT',
		jmbag: Buffer.from(Math.random().toString())
			.toString('base64')
			.substring(5, 15),
		mentorID: null,
		googleUserId: null,
		avatar: null,
	});
	userId = newUser.id;
	expect(newUser).not.toBeNull();
});

//
//
//
// Subject CRUD
test('Subject create', async () => {
	newSubject = await createSubjectInteractor(subjectRepo, testSubject);
	expect(newSubject).not.toBeNull();
});

test('Subject update', async () => {
	subjectId = newSubject.id;
	userId = newUser.id;
	let updateSubject: updateSubjectEntity = {
		id: subjectId,
		title: Buffer.from(Math.random().toString())
			.toString('base64')
			.substring(5, 15),
	};
	newSubject = await updateSubjectInteractor(
		userId,
		'SUPERADMIN',
		enrollmentRepo,
		subjectRepo,
		updateSubject
	);
	expect(newSubject).not.toBeNull();
});
test('Subject get', async () => {
	subjectId = newSubject.id;
	let getSubject: SubjectEntity | null = await getSubjectInteractor(
		subjectRepo,
		subjectId
	);
	expect(getSubject).not.toBeNull();
});

test('Subject list', async () => {
	let izlaz: SubjectEntity[] = await listSubjectsInteractor(subjectRepo);
	expect(izlaz).not.toBeNull();
});
//
//
//
// kreiranje PinnedEvent-a (i zato Event-a) u svrhu testiranja izlistavanja
let newEvent: EventEntity;
test('Event create', async () => {
	newEvent = await createEventInteractor(eventRepo, {
		id: '',
		title: 'test',
		description: 'test',
		linkedEntity: 'SUBJECT',
		linkedEntityId: 'test',
	});
	expect(newEvent).not.toBeNull();
});
let newPinnedEvent: PinnedEventEntity;
test('PinnedEvent create', async () => {
	subjectId = newSubject.id;
	eventId = newEvent.id;
	newPinnedEvent = await createPinnedEventInteractor(pinnedEventRepo, {
		id: '',
		subjectId: subjectId,
		eventId: eventId,
	});
	expect(newSubject).not.toBeNull();
});
test('PinnedEvents get', async () => {
	subjectId = newSubject.id;
	let izlaz: PinnedEventEntity[] = await listPinnedEventsInteractor(
		pinnedEventRepo,
		subjectId
	);
	expect(izlaz).not.toBeNull();
});

//
//
//
// brisanje
test('PinnedEvent delete', async () => {
	pinnedEventId = newPinnedEvent.id;
	let deletePinnedEvent: PinnedEventEntity = await deletePinnedEventInteractor(
		pinnedEventId,
		pinnedEventRepo
	);
	expect(deletePinnedEvent).not.toBeNull();
});
test('Subject delete', async () => {
	subjectId = newSubject.id;
	let deleteSubject: SubjectEntity = await deleteSubjectInteractor(
		subjectId,
		subjectRepo
	);
	expect(deleteSubject).not.toBeNull();
});
test('User delete', async () => {
	userId = newUser.id;
	let deleteUser: UserEntity = await deleteUserInteractor(
		userId,
		userRepo,
		enrollmentRepo
	);
	expect(deleteUser).not.toBeNull();
});
test('Event delete', async () => {
	let deleteEvent: EventEntity = await deleteEventInteractor(
		eventId,
		eventRepo
	);
	expect(deleteEvent).not.toBeNull();
});
