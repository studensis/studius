import { Prisma } from '@prisma/client';
import createRoomInteractor from '../../Room/interactors/createRoomInteractor';
import { RoomEntity } from '../../Room/model/RoomEntity';
import RoomRepositoryPrisma from '../../Room/repository/RoomRepositoryPrisma';
import createScheduleInteractor from '../../Schedule/interactors/createScheduleInteractor';
import deleteScheduleInteractor from '../../Schedule/interactors/deleteScheduleInteractor';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import ScheduleRepositoryPrisma from '../../Schedule/repository/ScheduleRepositoryPrisma';
import archiveEventInteractor from '../interactors/archiveEventInteractor';
import archiveScheduleByEventIdInteractor from '../interactors/archiveScheduleByEventIdInteractor';
import createEventInteractor from '../interactors/createEventInteractor';
import deleteEventInteractor from '../interactors/deleteEventInteractor';
import getEventInteractor from '../interactors/getEventInteractor';
import listAssociatedSchedulesInteractor from '../interactors/listAssociatedSchedulesInteractor';
import listEventsInteractor from '../interactors/listEventsInteractor';
import updateEventInteractor from '../interactors/updateEventInteractor';
import { EventEntity } from '../model/EventEntity';
import { updateEventEntity } from '../model/updateEventEntity';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';

const repo = new EventRepositoryPrisma();
const Schedulerepo = new ScheduleRepositoryPrisma();
const roomRepo = new RoomRepositoryPrisma();

let testEvent: EventEntity = {
	id: '',
	title: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	description: '',
	linkedEntity: 'SEMINAR',
	linkedEntityId: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
};
let newEvent: EventEntity;
let eventId: string;
let roomId: string;
let ScheduleID: string;

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
	title: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
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
// kreiranje Schedule-a u svrhu potpunog testiranja Event CRUD-a
let testSchedule: ScheduleEntity = {
	id: '',
	eventId: '',
	roomId: '',
	dateStart: new Date(Date.parse('04 Dec 1995 00:12:00 GMT')),
	dateEnd: new Date(Date.parse('04 Dec 1995 00:12:00 GMT')),
	status: 'ACTIVE',
};
let newSchedule: ScheduleEntity;
test('Event schedule (create Schedule)', async () => {
	roomId = newRoom.id;
	newSchedule = await createScheduleInteractor(Schedulerepo, {
		...testSchedule,
		eventId: eventId,
		roomId: roomId,
	});
	expect(newSchedule).not.toBeNull();
});
//
//
//
// listanje
test('Event list', async () => {
	let izlaz: EventEntity[] = await listEventsInteractor(repo);
	expect(izlaz).not.toBeNull();
});
test('Event list associated Schedules', async () => {
	let izlaz: ScheduleEntity[] = await listAssociatedSchedulesInteractor(
		repo,
		eventId
	);
	expect(izlaz).not.toBeNull();
});
//
//
//
// arhiviranje
test('Schedule archiving before associated Event archiving', async () => {
	let Schedulearchiving: Prisma.BatchPayload =
		await archiveScheduleByEventIdInteractor(eventId, Schedulerepo);
	expect(Schedulearchiving).not.toBeNull();
});
test('Event archive', async () => {
	let newEvent: EventEntity = await archiveEventInteractor(eventId, repo);
	expect(newEvent).not.toBeNull();
});
//
//
//
// brisanje
// potrebno popravit jer se nemre obrisat Event ako ima Schedule, a taj Schedule ako ima EUP itd itd, trenutno je potrebno rucno brisat Schedule-jeve povezane s Eventom kako bi se mogao izbrisati sami Event
test('delete Schedule created in test', async () => {
	ScheduleID = newSchedule.id;
	let deletedSchedule: ScheduleEntity = await deleteScheduleInteractor(
		ScheduleID,
		Schedulerepo
	);
	expect(deletedSchedule).not.toBeNull();
});
test('Event delete', async () => {
	let deleteEvent: EventEntity = await deleteEventInteractor(eventId, repo);
	expect(deleteEvent).not.toBeNull();
});
