import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
import createEventInteractor from '../../Event/interactors/createEventInteractor';
import deleteEventInteractor from '../../Event/interactors/deleteEventInteractor';
import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import createRoomInteractor from '../../Room/interactors/createRoomInteractor';
import deleteRoomInteractor from '../../Room/interactors/deleteRoomInteractor';
import { RoomEntity } from '../../Room/model/RoomEntity';
import RoomRepositoryPrisma from '../../Room/repository/RoomRepositoryPrisma';
import createRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/createRoomTimeEventInteractor';
import deleteRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/deleteRoomTimeEventInteractor';
import { RoomTimeEventEntity } from '../../RoomTimeEvent/model/RoomTimeEventEntity';
import RoomTimeEventRepositoryPrisma from '../../RoomTimeEvent/repository/RoomTimeEventRepositoryPrisma';
import createUserInteractor from '../../User/interactors/createUserInteractor';
import deleteUserInteractor from '../../User/interactors/deleteUserInteractor';
import { UserEntity } from '../../User/model/UserEntity';
import UserRepositoryPrisma from '../../User/repository/UserRepositoryPrisma';
import createEventUserPresenceInteractor from '../interactors/createEventUserPresenceInteractor';
import deleteEventUserPresenceInteractor from '../interactors/deleteEventUserPresenceInteractor';
import getEventUserPresenceInteractor from '../interactors/getEventUserPresenceInteractor';
import listEventUserPresencesInteractor from '../interactors/listEventUserPresencesInteractor';
import updateEventUserPresenceInteractor from '../interactors/updateEventUserPresenceInteractor';
import { EventUserPresenceEntity } from '../model/EventUserPresenceEntity';
import { updateEventUserPresenceEntity } from '../model/updateEventUserPresenceEntity';
import EventUserPresenceRepositoryPrisma from '../repository/EventUserPresenceRepositoryPrisma';

const repo = new EventUserPresenceRepositoryPrisma();
const eventRepo = new EventRepositoryPrisma();
const RTErepo = new RoomTimeEventRepositoryPrisma();
const userRepo = new UserRepositoryPrisma();
const roomRepo = new RoomRepositoryPrisma();
const enrollmentRepo = new EnrollmentRepositoryPrisma();

let newEUP: EventUserPresenceEntity;
let newUser: UserEntity;
let newRoom: RoomEntity;
let newEvent: EventEntity;
let newRTE: RoomTimeEventEntity;
let EUPID: string;
let eventId: string;
let RTEID: string;
let userId: string;
let roomId: string;

// kreacije entiteta bitnih za CRUD EventUserPresence-a

test('Event create', async () => {
	newEvent = await createEventInteractor(eventRepo, {
		id: '',
		title: 'test test test test',
		description: '',
		linkedEntity: 'SEMINAR',
		linkedEntityId: '123',
	});
	eventId = newEvent.id;
	expect(newEvent).not.toBeNull();
});
test('Room create', async () => {
	newRoom = await createRoomInteractor(roomRepo, {
		id: '',
		title: 'test test test',
		capacity: 20,
	});
	roomId = newRoom.id;
	expect(newRoom).not.toBeNull();
});
test('RTE create', async () => {
	newRTE = await createRoomTimeEventInteractor(RTErepo, {
		id: '',
		eventId: eventId,
		roomId: roomId,
		dateStart: new Date(Date.parse('04 Dec 1995 00:12:00 GMT')),
		dateEnd: new Date(Date.parse('04 Dec 1995 00:12:00 GMT')),
		status: 'ACTIVE',
	});
	RTEID = newRTE.id;
	expect(newRTE).not.toBeNull();
});
test('User create', async () => {
	newUser = await createUserInteractor(userRepo, {
		id: '',
		password: '123456789',
		firstname: 'test',
		lastname: 'testic',
		email: '1234@fer.hr',
		userRole: 'DEFAULT',
		jmbag: '1234567891',
		mentorID: null,
	});
	userId = newUser.id;
	expect(newUser).not.toBeNull();
});
//
//
//
//
// EventUserPresence CRUD
let testEventUserPresence: EventUserPresenceEntity = {
	id: '',
	presenceStatus: true,
	roomTimeEventId: '',
	userId: '',
};
test('EventUserPresence create', async () => {
	RTEID = newRTE.id;
	userId = newUser.id;
	newEUP = await createEventUserPresenceInteractor(repo, {
		...testEventUserPresence,
		roomTimeEventId: RTEID,
		userId: userId,
	});
	EUPID = newEUP.id;
	expect(newEUP).not.toBeNull();
});

test('EventUserPresence update', async () => {
	EUPID = newEUP.id;
	let updateEUP: updateEventUserPresenceEntity = {
		id: EUPID,
		presenceStatus: false,
	};
	newEUP = await updateEventUserPresenceInteractor(repo, updateEUP);
	expect(newEUP).not.toBeNull();
});
test('EventUserPresence get', async () => {
	EUPID = newEUP.id;
	let EUP: EventUserPresenceEntity = await getEventUserPresenceInteractor(
		repo,
		EUPID
	);
	expect(EUP).not.toBeNull();
});

test('EventUserPresence list', async () => {
	let izlaz: EventUserPresenceEntity[] = await listEventUserPresencesInteractor(
		repo
	);
	expect(izlaz).not.toBeNull();
});
//
//
//
//
// deletion
test('EventUserPresence delete', async () => {
	EUPID = newEUP.id;
	let deleteEUP: EventUserPresenceEntity =
		await deleteEventUserPresenceInteractor(EUPID, repo);
	expect(deleteEUP).not.toBeNull();
});
test('RTE delete', async () => {
	RTEID = newRTE.id;
	let deleteRTE: RoomTimeEventEntity = await deleteRoomTimeEventInteractor(
		RTEID,
		RTErepo
	);
	expect(deleteRTE).not.toBeNull();
});
test('Room delete', async () => {
	roomId = newRoom.id;
	let deleteRoom: RoomEntity = await deleteRoomInteractor(roomId, roomRepo);
	expect(deleteRoom).not.toBeNull();
});
test('Event delete', async () => {
	eventId = newEvent.id;
	let deleteEvent: EventEntity = await deleteEventInteractor(
		eventId,
		eventRepo
	);
	expect(deleteEvent).not.toBeNull();
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
