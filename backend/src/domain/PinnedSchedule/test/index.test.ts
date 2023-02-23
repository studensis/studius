import createEventInteractor from '../../Event/interactors/createEventInteractor';
import deleteEventInteractor from '../../Event/interactors/deleteEventInteractor';
import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import createRoomInteractor from '../../Room/interactors/createRoomInteractor';
import deleteRoomInteractor from '../../Room/interactors/deleteRoomInteractor';
import { RoomEntity } from '../../Room/model/RoomEntity';
import RoomRepositoryPrisma from '../../Room/repository/RoomRepositoryPrisma';
import createScheduleInteractor from '../../Schedule/interactors/createScheduleInteractor';
import deleteScheduleInteractor from '../../Schedule/interactors/deleteScheduleInteractor';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import ScheduleRepositoryPrisma from '../../Schedule/repository/ScheduleRepositoryPrisma';
import createSubjectInteractor from '../../Subject/interactors/createSubjectInteractor';
import deleteSubjectInteractor from '../../Subject/interactors/deleteSubjectInteractor';
import { SubjectEntity } from '../../Subject/model/SubjectEntity';
import SubjectRepositoryPrisma from '../../Subject/repository/SubjectRepositoryPrisma';
import createPinnedScheduleInteractor from '../interactors/createPinnedScheduleInteractor';
import deletePinnedScheduleInteractor from '../interactors/deletePinnedScheduleInteractor';
import getPinnedScheduleInteractor from '../interactors/getPinnedScheduleInteractor';
import listPinnedSchedulesInteractor from '../interactors/listPinnedSchedulesInteractor';
import updatePinnedScheduleInteractor from '../interactors/updatePinnedScheduleInteractor';
import { PinnedScheduleEntity } from '../model/PinnedScheduleEntity';
import { updatePinnedScheduleEntity } from '../model/updatePinnedScheduleEntity';
import PinnedScheduleRepositoryPrisma from '../repository/PinnedScheduleRepositoryPrisma';

const repo = new PinnedScheduleRepositoryPrisma();
const subjectRepo = new SubjectRepositoryPrisma();
const scheduleRepo = new ScheduleRepositoryPrisma();
const eventRepo = new EventRepositoryPrisma();
const roomRepo = new RoomRepositoryPrisma();

let newPinnedSchedule: PinnedScheduleEntity;
let id: string;
let subjectId: string;
let scheduleId: string;
let eventId: string;
let roomId: string;

//
//
//
// kreiranje potrebnih entiteta u svrhu testiranja PinnedSchedule-a
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
		description: '',
		linkedEntity: 'SEMINAR',
		linkedEntityId: Buffer.from(Math.random().toString())
			.toString('base64')
			.substring(5, 15),
	});
	expect(newEvent).not.toBeNull();
});
let newRoom: RoomEntity;
test('Room create', async () => {
	newRoom = await createRoomInteractor(roomRepo, {
		id: '',
		title: Buffer.from(Math.random().toString())
			.toString('base64')
			.substring(5, 15),
		capacity: 22,
	});
	expect(newRoom).not.toBeNull();
});
let newSchedule: ScheduleEntity;
test('Schedule create', async () => {
	eventId = newEvent.id;
	roomId = newRoom.id;
	newSchedule = await createScheduleInteractor(scheduleRepo, {
		id: '',
		dateStart: new Date(Date.now()),
		dateEnd: new Date(Date.now()),
		status: 'ACTIVE',
		eventId: eventId,
		roomId: roomId,
	});
	expect(newSchedule).not.toBeNull();
});

//
//
//
//
test('PinnedSchedule create', async () => {
	subjectId = newSubject.id;
	scheduleId = newSchedule.id;
	newPinnedSchedule = await createPinnedScheduleInteractor(repo, {
		id: '',
		subjectId: subjectId,
		scheduleId: scheduleId,
	});
	expect(newPinnedSchedule).not.toBeNull();
});

test('PinnedSchedule update', async () => {
	id = newPinnedSchedule.id;
	let updatePinnedSchedule: updatePinnedScheduleEntity = {
		id: id,
	};
	newPinnedSchedule = await updatePinnedScheduleInteractor(
		repo,
		updatePinnedSchedule
	);
	expect(newPinnedSchedule).not.toBeNull();
});
test('PinnedSchedule get', async () => {
	let newPinnedSchedule: PinnedScheduleEntity =
		await getPinnedScheduleInteractor(repo, id);
	expect(newPinnedSchedule).not.toBeNull();
});

test('PinnedSchedule list', async () => {
	let izlaz: PinnedScheduleEntity[] = await listPinnedSchedulesInteractor(repo);
	expect(izlaz).not.toBeNull();
});
//
//
//
// brisanje
test('PinnedSchedule delete', async () => {
	let deletePinnedSchedule: PinnedScheduleEntity =
		await deletePinnedScheduleInteractor(id, repo);
	expect(deletePinnedSchedule).not.toBeNull();
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
test('Schedule delete', async () => {
	let deleteSchedule: ScheduleEntity = await deleteScheduleInteractor(
		scheduleId,
		scheduleRepo
	);
	expect(deleteSchedule).not.toBeNull();
});
