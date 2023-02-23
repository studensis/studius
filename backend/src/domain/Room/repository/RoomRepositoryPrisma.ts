import { PrismaClient } from '@prisma/client';
import { paginationType } from '../../pagination/paginationObj';
import { RoomEntity } from '../model/RoomEntity';
import { updateRoomEntity } from '../model/updateRoomEntity';
import { RoomRepository } from './RoomRepository';

const prisma = new PrismaClient();

export default class RoomRepositoryPrisma extends RoomRepository {
	async getAll() {
		// prisma Rooms
		let datas = await prisma.room.findMany();

		// map to RoomEntities
		let rooms: RoomEntity[] = [];
		datas.forEach((data: RoomEntity) => {
			let room: RoomEntity = data;
			rooms.push(room);
		});

		return rooms;
	}

	async listPaginated(paginationInfo: paginationType) {
		// prisma Rooms
		let datas = await prisma.room.findMany({
			skip: paginationInfo.objectsPerPage * paginationInfo.pageNumber,
			take: paginationInfo.objectsPerPage,
		});

		// map to RoomEntities
		let rooms: RoomEntity[] = [];
		datas.forEach((data: RoomEntity) => {
			let room: RoomEntity = data;
			rooms.push(room);
		});

		return rooms;
	}

	async getById(id: string) {
		let data = await prisma.room.findUnique({ where: { id: id } });
		if (data) {
			let room: RoomEntity = data;
			return room;
		} else {
			throw new Error('no data');
		}
	}

	async update(roomData: updateRoomEntity) {
		let updatedData = await prisma.room.update({
			where: {
				id: roomData.id,
			},
			data: {
				capacity: roomData.capacity ? roomData.capacity : undefined,
			},
		});
		let rez: RoomEntity = updatedData;

		return rez;
	}

	async create(room: RoomEntity) {
		let response = await prisma.room.create({
			data: {
				capacity: room.capacity,
				title: room.title,
			},
		});

		console.log(response);

		let out: RoomEntity = response;
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
