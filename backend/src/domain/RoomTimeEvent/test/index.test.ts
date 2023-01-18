import createEventInteractor from '../../Event/interactors/createEventInteractor';
import deleteEventInteractor from '../../Event/interactors/deleteEventInteractor';
import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import createEventUserPresenceInteractor from '../../EventUserPresence/interactors/createEventUserPresenceInteractor';
import { EventUserPresenceEntity } from '../../EventUserPresence/model/EventUserPresenceEntity';
import EventUserPresenceRepositoryPrisma from '../../EventUserPresence/repository/EventUserPresenceRepositoryPrisma';
import createRoomInteractor from '../../Room/interactors/createRoomInteractor';
import deleteRoomInteractor from '../../Room/interactors/deleteRoomInteractor';
import { RoomEntity } from '../../Room/model/RoomEntity';
import RoomRepositoryPrisma from '../../Room/repository/RoomRepositoryPrisma';
import createUserInteractor from '../../User/interactors/createUserInteractor';
import deleteUserInteractor from '../../User/interactors/deleteUserInteractor';
import { UserEntity } from '../../User/model/UserEntity';
import UserRepositoryPrisma from '../../User/repository/UserRepositoryPrisma';
import archiveRoomTimeEventInteractor from '../interactors/archiveRoomTimeEventInteractor';
import createRoomTimeEventInteractor from '../interactors/createRoomTimeEventInteractor';
import deleteEventUserPresenceByRTEIDInteractor from '../interactors/deleteEventUserPresenceByRTEIDInteractor';
import deleteRoomTimeEventInteractor from '../interactors/deleteRoomTimeEventInteractor';
import getRoomTimeEventInteractor from '../interactors/getRoomTimeEventInteractor';
import listAssociatedEventUserPresencesInteractor from '../interactors/listAssociatedEventUserPresencesInteractor';
import updateRoomTimeEventInteractor from '../interactors/updateRoomTimeEventInteractor';
import { RoomTimeEventEntity } from '../model/RoomTimeEventEntity';
import { updateRoomTimeEventEntity } from '../model/updateRoomTimeEventEntity';
import RoomTimeEventRepositoryPrisma from '../repository/RoomTimeEventRepositoryPrisma';

const eventRepo = new EventRepositoryPrisma();
const RTErepo = new RoomTimeEventRepositoryPrisma();
const roomRepo = new RoomRepositoryPrisma();
const userRepo = new UserRepositoryPrisma();
const EUPrepo = new EventUserPresenceRepositoryPrisma();

let testEvent: EventEntity = {
	id: '',
	title: 'test test test',
	description: '',
	linkedEntity: 'SEMINAR',
	linkedEntityId: '123',
};
let newEvent: EventEntity;
let newRoom: RoomEntity;
let newUser: UserEntity;
let eventId: string;
let RTEID: string;
let userId: string;
let roomId: string;
//
//
//
// kreacija Event-a, Room-a i User-a potrebnih za testiranje sveukupnog CRUD-a RoomTimeEvent-a
test('Event create', async () => {
	newEvent = await createEventInteractor(eventRepo, testEvent);
	expect(newEvent).not.toBeNull();
	eventId = newEvent.id;
});
test('Room create', async () => {
	newRoom = await createRoomInteractor(roomRepo, {
		id: '',
		title: 'test test test',
		capacity: 20,
	});
	roomId = newRoom.id;
	expect(newEvent).not.toBeNull();
});
test('User create', async () => {
	newUser = await createUserInteractor(userRepo, {
		id: '',
		password: '123456789',
		firstname: 'test',
		lastname: 'testic',
		email: 'testtest@fer.hr',
		userRole: 'DEFAULT',
		jmbag: '1234567777',
		mentorID: null,
	});
	userId = newUser.id;
	expect(newUser).not.toBeNull();
});
//
//
//
//	RoomTimeEvent CRUD pocinje ovdje
let testRTE: RoomTimeEventEntity = {
	id: '',
	eventId: '',
	roomId: '',
	dateStart: new Date(Date.parse('04 Dec 1995 00:12:00 GMT')),
	dateEnd: new Date(Date.parse('04 Dec 1995 00:12:00 GMT')),
	status: 'ACTIVE',
};
let newRTE: RoomTimeEventEntity;
test('Event schedule (create RoomTimeEvent)', async () => {
	eventId = newEvent.id;
	roomId = newRoom.id;
	newRTE = await createRoomTimeEventInteractor(RTErepo, {
		...testRTE,
		eventId: eventId,
		roomId: roomId,
	});
	expect(newRTE).not.toBeNull();
});
test('RoomTimeEvent archive', async () => {
	RTEID = newRTE.id;
	let RTEarchiving: RoomTimeEventEntity = await archiveRoomTimeEventInteractor(
		RTEID,
		RTErepo
	);
	expect(RTEarchiving).not.toBeNull();
});
test('RoomTimeEvent update', async () => {
	RTEID = newRTE.id;
	let updateRTE: updateRoomTimeEventEntity = {
		id: RTEID,
		dateEnd: new Date(Date.parse('04 Apr 2001 00:12:00 GMT')),
	};
	newRTE = await updateRoomTimeEventInteractor(RTErepo, updateRTE);
	expect(newRTE).not.toBeNull();
});
test('RoomTimeEvent get', async () => {
	RTEID = newRTE.id;
	let RTE: RoomTimeEventEntity = await getRoomTimeEventInteractor(
		RTErepo,
		RTEID
	);
	expect(RTE).not.toBeNull();
});
//
//
//
//
// kreacija EventUserPresence-a u svrhu testiranja RoomTimeEvent-ovog izlistavanja i brisanja povezanih EventUserPresence-a
let newEUP: EventUserPresenceEntity;
test('EventUserPresence create', async () => {
	RTEID = newRTE.id;
	userId = newUser.id;
	newEUP = await createEventUserPresenceInteractor(EUPrepo, {
		id: '',
		presenceStatus: true,
		roomTimeEventId: RTEID,
		userId: userId,
	});
	expect(newEUP).not.toBeNull();
});
test('RoomTimeEvent list associated EventUserPresences', async () => {
	RTEID = newRTE.id;
	let EUPs: EventUserPresenceEntity[] =
		await listAssociatedEventUserPresencesInteractor(RTErepo, RTEID);
	expect(EUPs).not.toBeNull();
});
// interaktor ispod obicno koristen automatski prije brisanja bilokojeg RoomTimeEvent-a
test('delete EventUserPresences associated to tested RoomTimeEvent', async () => {
	RTEID = newRTE.id;
	let EUPs: string = await deleteEventUserPresenceByRTEIDInteractor(
		RTEID,
		EUPrepo
	);
	expect(EUPs).not.toBeNull();
});
//
//
//
// brisanje
test('RoomTimeEvent delete', async () => {
	RTEID = newRTE.id;
	let deletedRTE: RoomTimeEventEntity = await deleteRoomTimeEventInteractor(
		RTEID,
		RTErepo
	);
	expect(deletedRTE).not.toBeNull();
});
test('Event delete', async () => {
	eventId = newEvent.id;
	let deleteEvent: EventEntity = await deleteEventInteractor(
		eventId,
		eventRepo
	);
	expect(deleteEvent).not.toBeNull();
});
test('Room delete', async () => {
	roomId = newRoom.id;
	let deleteRoom: RoomEntity = await deleteRoomInteractor(roomId, roomRepo);
	expect(deleteRoom).not.toBeNull();
});
test('User delete', async () => {
	userId = newUser.id;
	let deleteUser: UserEntity = await deleteUserInteractor(userId, userRepo);
	expect(deleteUser).not.toBeNull();
});
