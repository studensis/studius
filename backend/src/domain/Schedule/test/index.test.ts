import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
import createEventInteractor from '../../Event/interactors/createEventInteractor';
import deleteEventInteractor from '../../Event/interactors/deleteEventInteractor';
import { EventEntity } from '../../Event/model/EventEntity';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import createRoomInteractor from '../../Room/interactors/createRoomInteractor';
import deleteRoomInteractor from '../../Room/interactors/deleteRoomInteractor';
import { RoomEntity } from '../../Room/model/RoomEntity';
import RoomRepositoryPrisma from '../../Room/repository/RoomRepositoryPrisma';
import createUserInteractor from '../../User/interactors/createUserInteractor';
import deleteUserInteractor from '../../User/interactors/deleteUserInteractor';
import { UserEntity } from '../../User/model/UserEntity';
import UserRepositoryPrisma from '../../User/repository/UserRepositoryPrisma';
import createUserPresenceInteractor from '../../UserPresence/interactors/createUserPresenceInteractor';
import { UserPresenceEntity } from '../../UserPresence/model/UserPresenceEntity';
import UserPresenceRepositoryPrisma from '../../UserPresence/repository/UserPresenceRepositoryPrisma';
import archiveScheduleInteractor from '../interactors/archiveScheduleInteractor';
import createScheduleInteractor from '../interactors/createScheduleInteractor';
import deleteScheduleInteractor from '../interactors/deleteScheduleInteractor';
import deleteUserPresenceByScheduleIDInteractor from '../interactors/deleteUserPresenceByScheduleIDInteractor';
import getScheduleInteractor from '../interactors/getScheduleInteractor';
import listAssociatedUserPresencesInteractor from '../interactors/listAssociatedUserPresencesInteractor';
import updateScheduleInteractor from '../interactors/updateScheduleInteractor';
import { ScheduleEntity } from '../model/ScheduleEntity';
import { updateScheduleEntity } from '../model/updateScheduleEntity';
import ScheduleRepositoryPrisma from '../repository/ScheduleRepositoryPrisma';

const eventRepo = new EventRepositoryPrisma();
const Schedulerepo = new ScheduleRepositoryPrisma();
const roomRepo = new RoomRepositoryPrisma();
const userRepo = new UserRepositoryPrisma();
const EUPrepo = new UserPresenceRepositoryPrisma();
const enrollmentRepo = new EnrollmentRepositoryPrisma();

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
let newRoom: RoomEntity;
let newUser: UserEntity;
let eventId: string;
let ScheduleID: string;
let userId: string;
let roomId: string;
//
//
//
// kreacija Event-a, Room-a i User-a potrebnih za testiranje sveukupnog CRUD-a Schedule-a
test('Event create', async () => {
	newEvent = await createEventInteractor(eventRepo, testEvent);
	expect(newEvent).not.toBeNull();
	eventId = newEvent.id;
});
test('Room create', async () => {
	newRoom = await createRoomInteractor(roomRepo, {
		id: '',
		title: Buffer.from(Math.random().toString())
			.toString('base64')
			.substring(5, 15),
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
//	Schedule CRUD pocinje ovdje
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
	eventId = newEvent.id;
	roomId = newRoom.id;
	newSchedule = await createScheduleInteractor(Schedulerepo, {
		...testSchedule,
		eventId: eventId,
		roomId: roomId,
	});
	expect(newSchedule).not.toBeNull();
});
test('Schedule archive', async () => {
	ScheduleID = newSchedule.id;
	let Schedulearchiving: ScheduleEntity = await archiveScheduleInteractor(
		ScheduleID,
		Schedulerepo
	);
	expect(Schedulearchiving).not.toBeNull();
});
test('Schedule update', async () => {
	ScheduleID = newSchedule.id;
	let updateSchedule: updateScheduleEntity = {
		id: ScheduleID,
		dateEnd: new Date(Date.parse('04 Apr 2001 00:12:00 GMT')),
	};
	newSchedule = await updateScheduleInteractor(Schedulerepo, updateSchedule);
	expect(newSchedule).not.toBeNull();
});
test('Schedule get', async () => {
	ScheduleID = newSchedule.id;
	let Schedule: ScheduleEntity = await getScheduleInteractor(
		Schedulerepo,
		ScheduleID
	);
	expect(Schedule).not.toBeNull();
});
//
//
//
//
// kreacija UserPresence-a u svrhu testiranja Schedule-ovog izlistavanja i brisanja povezanih UserPresence-a
let newEUP: UserPresenceEntity;
test('UserPresence create', async () => {
	ScheduleID = newSchedule.id;
	userId = newUser.id;
	newEUP = await createUserPresenceInteractor(EUPrepo, {
		id: '',
		presenceStatus: true,
		scheduleId: ScheduleID,
		userId: userId,
	});
	expect(newEUP).not.toBeNull();
});
test('Schedule list associated UserPresences', async () => {
	ScheduleID = newSchedule.id;
	let EUPs: UserPresenceEntity[] = await listAssociatedUserPresencesInteractor(
		Schedulerepo,
		ScheduleID
	);
	expect(EUPs).not.toBeNull();
});
// interaktor ispod obicno koristen automatski prije brisanja bilokojeg Schedule-a
test('delete UserPresences associated to tested Schedule', async () => {
	ScheduleID = newSchedule.id;
	let EUPs: string = await deleteUserPresenceByScheduleIDInteractor(
		ScheduleID,
		EUPrepo
	);
	expect(EUPs).not.toBeNull();
});
//
//
//
// brisanje
test('Schedule delete', async () => {
	ScheduleID = newSchedule.id;
	let deletedSchedule: ScheduleEntity = await deleteScheduleInteractor(
		ScheduleID,
		Schedulerepo
	);
	expect(deletedSchedule).not.toBeNull();
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
	let deleteUser: UserEntity = await deleteUserInteractor(
		userId,
		userRepo,
		enrollmentRepo
	);
	expect(deleteUser).not.toBeNull();
});
