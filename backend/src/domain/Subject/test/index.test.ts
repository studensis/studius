import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
import createEventInteractor from '../../Event/interactors/createEventInteractor';
import deleteEventInteractor from '../../Event/interactors/deleteEventInteractor';
import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import createPinnedScheduleInteractor from '../../PinnedSchedule/interactors/createPinnedScheduleInteractor';
import deletePinnedScheduleInteractor from '../../PinnedSchedule/interactors/deletePinnedScheduleInteractor';
import { PinnedScheduleEntity } from '../../PinnedSchedule/model/PinnedScheduleEntity';
import PinnedScheduleRepositoryPrisma from '../../PinnedSchedule/repository/PinnedScheduleRepositoryPrisma';
import createRoomInteractor from '../../Room/interactors/createRoomInteractor';
import deleteRoomInteractor from '../../Room/interactors/deleteRoomInteractor';
import { RoomEntity } from '../../Room/model/RoomEntity';
import RoomRepositoryPrisma from '../../Room/repository/RoomRepositoryPrisma';
import createScheduleInteractor from '../../Schedule/interactors/createScheduleInteractor';
import deleteScheduleInteractor from '../../Schedule/interactors/deleteScheduleInteractor';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import ScheduleRepositoryPrisma from '../../Schedule/repository/ScheduleRepositoryPrisma';
import createUserInteractor from '../../User/interactors/createUserInteractor';
import deleteUserInteractor from '../../User/interactors/deleteUserInteractor';
import { UserEntity } from '../../User/model/UserEntity';
import UserRepositoryPrisma from '../../User/repository/UserRepositoryPrisma';
import createSubjectInteractor from '../interactors/createSubjectInteractor';
import deleteSubjectInteractor from '../interactors/deleteSubjectInteractor';
import getSubjectInteractor from '../interactors/getSubjectInteractor';
import listPinnedSchedulesBySubjectIdInteractor from '../interactors/listPinnedSchedulesBySubjectIdInteractor';
import listSubjectsInteractor from '../interactors/listSubjectsInteractor';
import updateSubjectInteractor from '../interactors/updateSubjectInteractor';
import { SubjectEntity } from '../model/SubjectEntity';
import { updateSubjectEntity } from '../model/updateSubjectEntity';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';

const subjectRepo = new SubjectRepositoryPrisma();
let enrollmentRepo = new EnrollmentRepositoryPrisma();
let userRepo = new UserRepositoryPrisma();
let pinnedScheduleRepo = new PinnedScheduleRepositoryPrisma();
let eventRepo = new EventRepositoryPrisma();
let roomRepo = new RoomRepositoryPrisma();
let scheduleRepo = new ScheduleRepositoryPrisma();

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
let pinnedScheduleId: string;
let eventId: string;
let roomId: string;
let scheduleId: string;

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
// kreiranje entiteta u svrhu testiranja izlistavanja
let newEvent: EventEntity;
test('Event create', async () => {
	newEvent = await createEventInteractor(eventRepo, {
		id: '',
		title: Buffer.from(Math.random().toString())
			.toString('base64')
			.substring(5, 15),
		description: '',
		linkedEntity: 'ASSIGNMENT',
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
let newPinnedSchedule: PinnedScheduleEntity;
test('PinnedSchedule create', async () => {
	subjectId = newSubject.id;
	scheduleId = newSchedule.id;
	newPinnedSchedule = await createPinnedScheduleInteractor(pinnedScheduleRepo, {
		id: '',
		subjectId: subjectId,
		scheduleId: scheduleId,
	});
	expect(newPinnedSchedule).not.toBeNull();
});
test('PinnedSchedules get', async () => {
	subjectId = newSubject.id;
	let izlaz: PinnedScheduleEntity[] =
		await listPinnedSchedulesBySubjectIdInteractor(
			pinnedScheduleRepo,
			subjectId
		);
	expect(izlaz).not.toBeNull();
});

//
//
//
// brisanje
test('PinnedSchedule delete', async () => {
	pinnedScheduleId = newPinnedSchedule.id;
	let deletePinnedSchedule: PinnedScheduleEntity =
		await deletePinnedScheduleInteractor(pinnedScheduleId, pinnedScheduleRepo);
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
