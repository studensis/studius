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

let newEventUserPresence: EventUserPresenceEntity;
let EUPID: string;
let eventId: string;
let RTEID: string;
let userId: string;
let roomId: string;

// kreacije entiteta bitnih za CRUD EventUserPresence-a

test('Event create', async () => {
	let newEvent = await createEventInteractor(eventRepo, {
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
	let newRoom = await createRoomInteractor(roomRepo, {
		id: '',
		title: 'test test test',
		capacity: 20,
	});
	roomId = newRoom.id;
	expect(newRoom).not.toBeNull();
});
test('RTE create', async () => {
	let newRTE = await createRoomTimeEventInteractor(RTErepo, {
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
	let newUser = await createUserInteractor(userRepo, {
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
	newEventUserPresence = await createEventUserPresenceInteractor(repo, {
		...testEventUserPresence,
		roomTimeEventId: RTEID,
		userId: userId,
	});
	EUPID = newEventUserPresence.id;
	expect(newEventUserPresence).not.toBeNull();
});

test('EventUserPresence update', async () => {
	EUPID = newEventUserPresence.id;
	let updateEventUserPresence: updateEventUserPresenceEntity = {
		id: EUPID,
		presenceStatus: false,
	};
	newEventUserPresence = await updateEventUserPresenceInteractor(
		repo,
		updateEventUserPresence
	);
	expect(newEventUserPresence).not.toBeNull();
});
test('EventUserPresence get', async () => {
	let newEventUserPresence: EventUserPresenceEntity =
		await getEventUserPresenceInteractor(repo, EUPID);
	expect(newEventUserPresence).not.toBeNull();
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
	let newEventUserPresence: EventUserPresenceEntity =
		await deleteEventUserPresenceInteractor(EUPID, repo);
	expect(newEventUserPresence).not.toBeNull();
});
test('RTE delete', async () => {
	let newRTE: RoomTimeEventEntity = await deleteRoomTimeEventInteractor(
		RTEID,
		RTErepo
	);
	expect(newRTE).not.toBeNull();
});
test('Room delete', async () => {
	let newRoom: RoomEntity = await deleteRoomInteractor(roomId, roomRepo);
	expect(newRoom).not.toBeNull();
});
test('Event delete', async () => {
	let newEvent: EventEntity = await deleteEventInteractor(eventId, eventRepo);
	expect(newEvent).not.toBeNull();
});
test('User delete', async () => {
	let newUser: UserEntity = await deleteUserInteractor(userId, userRepo);
	expect(newUser).not.toBeNull();
});
