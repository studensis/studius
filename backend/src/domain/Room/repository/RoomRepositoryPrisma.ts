import { PrismaClient } from '@prisma/client';
import RoomEntity from '../RoomEntity';
import { RoomRepository } from './RoomRepository';

const prisma = new PrismaClient();

export default class RoomRepositoryPrisma extends RoomRepository {
	async getAll() {
		// prisma Rooms
		let datas = await prisma.room.findMany();

		// map to RoomEntities
		let rooms: RoomEntity[] = [];
		datas.forEach((data) => {
			let room = new RoomEntity(data);
			rooms.push(room);
		});

		return rooms;
	}

	async getById(id: string) {
		let data = await prisma.room.findUnique({ where: { id: id } });
		if (data) {
			let room = new RoomEntity(data);
			return room;
		} else {
			throw new Error('no data');
		}
	}

	async update(roomData: RoomEntity) {
		let updatedRoom: any = {};

		if (roomData.capacity) updatedRoom['capacity'] = roomData.capacity;

		let updatedData = await prisma.room.update({
			where: {
				id: roomData.id,
			},
			data: {
				capacity: updatedRoom.capacity,
			},
		});
		let rez = new RoomEntity(updatedData);

		return rez;
	}

	async create(room: RoomEntity) {
		let response = await prisma.room.create({
			data: {
				id: room.id,
				capacity: room.capacity,
			},
		});

		console.log(response);

		let out = new RoomEntity(response);
		return out;
	}

	async delete(roomId: string) {
		let response = await prisma.room.delete({
			where: {
				id: roomId,
			},
		});

		return response;
	}
}
