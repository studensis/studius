import createRoomInteractor from '../../Room/interactors/createRoomInteractor';
import { RoomEntity } from '../../Room/model/RoomEntity';
import RoomRepositoryPrisma from '../../Room/repository/RoomRepositoryPrisma';
import createRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/createRoomTimeEventInteractor';
import deleteRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/deleteRoomTimeEventInteractor';
import { RoomTimeEventEntity } from '../../RoomTimeEvent/model/RoomTimeEventEntity';
import RoomTimeEventRepositoryPrisma from '../../RoomTimeEvent/repository/RoomTimeEventRepositoryPrisma';
import archiveEventInteractor from '../interactors/archiveEventInteractor';
import archiveRTEByEventIdInteractor from '../interactors/archiveRTEByEventIdInteractor';
import createEventInteractor from '../interactors/createEventInteractor';
import deleteEventInteractor from '../interactors/deleteEventInteractor';
import getEventInteractor from '../interactors/getEventInteractor';
import listAssociatedRoomTimeEventsInteractor from '../interactors/listAssociatedRoomTimeEventsInteractor';
import listEventsInteractor from '../interactors/listEventsInteractor';
import updateEventInteractor from '../interactors/updateEventInteractor';
import { EventEntity } from '../model/EventEntity';
import { updateEventEntity } from '../model/updateEventEntity';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';

const repo = new EventRepositoryPrisma();
const RTErepo = new RoomTimeEventRepositoryPrisma();
const roomRepo = new RoomRepositoryPrisma();

let testEvent: EventEntity = {
	id: '',
	title: 'test test test',
	description: '',
	linkedEntity: 'SEMINAR',
	linkedEntityId: '123',
};
let newEvent: EventEntity;
let eventId: string;
let roomId: string;
let RTEID: string;

//
//
//
// Event create, update i get
test('Event create', async () => {
	newEvent = await createEventInteractor(repo, testEvent);
	expect(newEvent).not.toBeNull();
});
test('Event update', async () => {
	eventId = newEvent.id;
	let updateEvent: updateEventEntity = {
		id: eventId,
		title: 'test test test updated',
	};
	newEvent = await updateEventInteractor(repo, updateEvent);
	expect(newEvent).not.toBeNull();
});
test('Event get', async () => {
	let newEvent: EventEntity = await getEventInteractor(repo, eventId);
	expect(newEvent).not.toBeNull();
});
//
//
//
// kreiranje Room-a u svrhu potpunog testiranja Event CRUD-a
let testRoom: RoomEntity = {
	id: '',
	title: 'test test test',
	capacity: 20,
};
let newRoom: RoomEntity;
test('Room create', async () => {
	newRoom = await createRoomInteractor(roomRepo, testRoom);
	roomId = newRoom.id;
	expect(newEvent).not.toBeNull();
});
//
//
//
// kreiranje RoomTimeEvent-a u svrhu potpunog testiranja Event CRUD-a
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
	roomId = newRoom.id;
	newRTE = await createRoomTimeEventInteractor(RTErepo, {
		...testRTE,
		eventId: eventId,
		roomId: roomId,
	});
	expect(newRTE).not.toBeNull();
});
//
//
//
// listanje
test('Event list', async () => {
	let izlaz: EventEntity[] = await listEventsInteractor(repo);
	expect(izlaz).not.toBeNull();
});
test('Event list associated RoomTimeEvents', async () => {
	let izlaz: RoomTimeEventEntity[] =
		await listAssociatedRoomTimeEventsInteractor(repo, eventId);
	expect(izlaz).not.toBeNull();
});
//
//
//
// arhiviranje
test('RTE archiving before associated Event archiving', async () => {
	let RTEarchiving: string = await archiveRTEByEventIdInteractor(
		eventId,
		RTErepo
	);
	expect(RTEarchiving).not.toBeNull();
});
test('Event archive', async () => {
	let newEvent: EventEntity = await archiveEventInteractor(eventId, repo);
	expect(newEvent).not.toBeNull();
});
//
//
//
// brisanje
// potrebno popravit jer se nemre obrisat Event ako ima RTE, a taj RTE ako ima EUP itd itd, trenutno je potrebno rucno brisat RTE-jeve povezane s Eventom kako bi se mogao izbrisati sami Event
test('delete RTE created in test', async () => {
	RTEID = newRTE.id;
	let deletedRTE: RoomTimeEventEntity = await deleteRoomTimeEventInteractor(
		RTEID,
		RTErepo
	);
	expect(deletedRTE).not.toBeNull();
});
test('Event delete', async () => {
	let newEvent: EventEntity = await deleteEventInteractor(eventId, repo);
	expect(newEvent).not.toBeNull();
});
