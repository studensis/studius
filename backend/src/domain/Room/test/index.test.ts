import createRoomInteractor from '../interactors/createRoomInteractor';
import deleteRoomInteractor from '../interactors/deleteRoomInteractor';
import getRoomInteractor from '../interactors/getRoomInteractor';
import listRoomsInteractor from '../interactors/listRoomsInteractor';
import updateRoomInteractor from '../interactors/updateRoomInteractor';
import { RoomEntity } from '../model/RoomEntity';
import { updateRoomEntity } from '../model/updateRoomEntity';
import RoomRepositoryPrisma from '../repository/RoomRepositoryPrisma';

const repo = new RoomRepositoryPrisma();
let testRoom: RoomEntity = {
	id: '',
	title: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	capacity: 22,
};
let newRoom: RoomEntity;
let id: string;

test('Room create', async () => {
	newRoom = await createRoomInteractor(repo, testRoom);
	expect(newRoom).not.toBeNull();
});

test('Room update', async () => {
	id = newRoom.id;
	let updateRoom: updateRoomEntity = {
		id: id,
		title: 'updated',
	};
	newRoom = await updateRoomInteractor(repo, updateRoom);
	expect(newRoom).not.toBeNull();
});
test('Room get', async () => {
	let newRoom: RoomEntity = await getRoomInteractor(repo, id);
	expect(newRoom).not.toBeNull();
});

test('Room list', async () => {
	let izlaz: RoomEntity[] = await listRoomsInteractor(repo);
	expect(izlaz).not.toBeNull();
});

test('Room delete', async () => {
	let newRoom: RoomEntity = await deleteRoomInteractor(id, repo);
	expect(newRoom).not.toBeNull();
});
