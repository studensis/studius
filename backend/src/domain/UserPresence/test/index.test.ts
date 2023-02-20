import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
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
import createUserInteractor from '../../User/interactors/createUserInteractor';
import deleteUserInteractor from '../../User/interactors/deleteUserInteractor';
import { UserEntity } from '../../User/model/UserEntity';
import UserRepositoryPrisma from '../../User/repository/UserRepositoryPrisma';
import createUserPresenceInteractor from '../interactors/createUserPresenceInteractor';
import deleteUserPresenceInteractor from '../interactors/deleteUserPresenceInteractor';
import getUserPresenceInteractor from '../interactors/getUserPresenceInteractor';
import listUserPresencesInteractor from '../interactors/listUserPresencesInteractor';
import updateUserPresenceInteractor from '../interactors/updateUserPresenceInteractor';
import { updateUserPresenceEntity } from '../model/updateUserPresenceEntity';
import { UserPresenceEntity } from '../model/UserPresenceEntity';
import UserPresenceRepositoryPrisma from '../repository/UserPresenceRepositoryPrisma';

const repo = new UserPresenceRepositoryPrisma();
const eventRepo = new EventRepositoryPrisma();
const Schedulerepo = new ScheduleRepositoryPrisma();
const userRepo = new UserRepositoryPrisma();
const roomRepo = new RoomRepositoryPrisma();
const enrollmentRepo = new EnrollmentRepositoryPrisma();

let newEUP: UserPresenceEntity;
let newUser: UserEntity;
let newRoom: RoomEntity;
let newEvent: EventEntity;
let newSchedule: ScheduleEntity;
let EUPID: string;
let eventId: string;
let ScheduleID: string;
let userId: string;
let roomId: string;

// kreacije entiteta bitnih za CRUD UserPresence-a

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
test('Schedule create', async () => {
	eventId = newEvent.id;
	roomId = newRoom.id;
	newSchedule = await createScheduleInteractor(Schedulerepo, {
		id: '',
		eventId: eventId,
		roomId: roomId,
		dateStart: new Date(Date.parse('04 Dec 1995 00:12:00 GMT')),
		dateEnd: new Date(Date.parse('04 Dec 1995 00:12:00 GMT')),
		status: 'ACTIVE',
	});
	ScheduleID = newSchedule.id;
	expect(newSchedule).not.toBeNull();
});
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
//
// UserPresence CRUD
let testUserPresence: UserPresenceEntity = {
	id: '',
	presenceStatus: true,
	scheduleId: '',
	userId: '',
};
test('UserPresence create', async () => {
	ScheduleID = newSchedule.id;
	userId = newUser.id;
	newEUP = await createUserPresenceInteractor(repo, {
		...testUserPresence,
		scheduleId: ScheduleID,
		userId: userId,
	});
	EUPID = newEUP.id;
	expect(newEUP).not.toBeNull();
});

test('UserPresence update', async () => {
	EUPID = newEUP.id;
	let updateEUP: updateUserPresenceEntity = {
		id: EUPID,
		presenceStatus: false,
	};
	newEUP = await updateUserPresenceInteractor(repo, updateEUP);
	expect(newEUP).not.toBeNull();
});
test('UserPresence get', async () => {
	EUPID = newEUP.id;
	let EUP: UserPresenceEntity = await getUserPresenceInteractor(repo, EUPID);
	expect(EUP).not.toBeNull();
});

test('UserPresence list', async () => {
	let izlaz: UserPresenceEntity[] = await listUserPresencesInteractor(repo);
	expect(izlaz).not.toBeNull();
});
//
//
//
//
// deletion
test('UserPresence delete', async () => {
	EUPID = newEUP.id;
	let deleteEUP: UserPresenceEntity = await deleteUserPresenceInteractor(
		EUPID,
		repo
	);
	expect(deleteEUP).not.toBeNull();
});
test('Schedule delete', async () => {
	ScheduleID = newSchedule.id;
	let deleteSchedule: ScheduleEntity = await deleteScheduleInteractor(
		ScheduleID,
		Schedulerepo
	);
	expect(deleteSchedule).not.toBeNull();
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
