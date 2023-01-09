import { PrismaClient } from '@prisma/client';
import { RoomTimeEventEntity } from '../model/RoomTimeEventEntity';
import { RoomTimeEventRepository } from './RoomTimeEventRepository';

const prisma = new PrismaClient();

export default class RoomTimeEventRepositoryPrisma extends RoomTimeEventRepository {
	async getAll() {
		// prisma RoomTimeEvents
		let datas = await prisma.roomTimeEvent.findMany();

		// map to RoomTimeEventEntities
		let roomTimeEvents: RoomTimeEventEntity[] = [];
		datas.forEach((data: RoomTimeEventEntity) => {
			let roomTimeEvent: RoomTimeEventEntity = data;
			roomTimeEvents.push(roomTimeEvent);
		});

		return roomTimeEvents;
	}

	async getById(id: string) {
		let data = await prisma.roomTimeEvent.findUnique({
			where: { id: id },
		});
		if (data) {
			let roomTimeEvent: RoomTimeEventEntity = data;
			return roomTimeEvent;
		} else {
			throw new Error('no data');
		}
	}

	async update(roomTimeEventData: RoomTimeEventEntity) {
		let updatedData = await prisma.roomTimeEvent.update({
			where: {
				id: roomTimeEventData.id,
			},
			data: {
				dateStart: roomTimeEventData.dateStart
					? roomTimeEventData.dateStart
					: undefined,
				dateEnd: roomTimeEventData.dateEnd
					? roomTimeEventData.dateEnd
					: undefined,
				eventId: roomTimeEventData.eventId
					? roomTimeEventData.eventId
					: undefined,
				roomId: roomTimeEventData.roomId ? roomTimeEventData.roomId : undefined,
			},
		});
		let rez: RoomTimeEventEntity = updatedData;

		return rez;
	}

	async create(roomTimeEventData: RoomTimeEventEntity) {
		let response = await prisma.roomTimeEvent.create({
			data: {
				dateStart: roomTimeEventData.dateStart,
				dateEnd: roomTimeEventData.dateEnd,
				eventId: roomTimeEventData.eventId,
				roomId: roomTimeEventData.roomId,
			},
		});

		console.log(response);

		let out: RoomTimeEventEntity = response;
		return out;
	}

	async delete(roomTimeEventId: string) {
		let response = await prisma.roomTimeEvent.delete({
			where: {
				id: roomTimeEventId,
			},
		});

		return response;
	}
}