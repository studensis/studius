import { PrismaClient } from '@prisma/client';
import RoomTimeEventEntity from '../model/RoomTimeEventEntity';
import { RoomTimeEventRepository } from './RoomTimeEventRepository';

const prisma = new PrismaClient();

export default class RoomTimeEventRepositoryPrisma extends RoomTimeEventRepository {
	async getAll() {
		// prisma RoomTimeEvents
		let datas = await prisma.roomTimeEvent.findMany();

		// map to RoomTimeEventEntities
		let roomTimeEvents: RoomTimeEventEntity[] = [];
		datas.forEach((data) => {
			let roomTimeEvent = new RoomTimeEventEntity(data);
			roomTimeEvents.push(roomTimeEvent);
		});

		return roomTimeEvents;
	}

	async getById(id: string) {
		let data = await prisma.roomTimeEvent.findUnique({ where: { id: id } });
		if (data) {
			let roomTimeEvent = new RoomTimeEventEntity(data);
			return roomTimeEvent;
		} else {
			throw new Error('no data');
		}
	}

	async update(roomTimeEventData: RoomTimeEventEntity) {
		let updatedRoomTimeEvent: any = {};

		if (roomTimeEventData.dateStart)
			updatedRoomTimeEvent['dateStart'] = roomTimeEventData.dateStart;
		if (roomTimeEventData.dateEnd)
			updatedRoomTimeEvent['dateEnd'] = roomTimeEventData.dateEnd;
		if (roomTimeEventData.roomId)
			updatedRoomTimeEvent['roomId'] = roomTimeEventData.roomId;
		if (roomTimeEventData.eventId)
			updatedRoomTimeEvent['eventId'] = roomTimeEventData.eventId;

		let updatedData = await prisma.roomTimeEvent.update({
			where: {
				id: roomTimeEventData.id,
			},
			data: {
				dateStart: updatedRoomTimeEvent.dateStart,
				dateEnd: updatedRoomTimeEvent.dateEnd,
				roomId: updatedRoomTimeEvent.roomId,
				eventId: updatedRoomTimeEvent.eventId,
			},
		});
		let rez = new RoomTimeEventEntity(updatedData);

		return rez;
	}

	async create(roomTimeEvent: RoomTimeEventEntity) {
		let response = await prisma.roomTimeEvent.create({
			data: {
				id: roomTimeEvent.id,
				dateStart: roomTimeEvent.dateStart,
				dateEnd: roomTimeEvent.dateEnd,
				roomId: roomTimeEvent.roomId,
				eventId: roomTimeEvent.eventId,
			},
		});

		console.log(response);

		let out = new RoomTimeEventEntity(response);
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
