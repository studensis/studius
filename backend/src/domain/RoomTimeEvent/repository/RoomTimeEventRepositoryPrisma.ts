import { PrismaClient } from '@prisma/client';
import { EventUserPresenceEntity } from '../../EventUserPresence/model/EventUserPresenceEntity';
import { RoomTimeEventEntity } from '../model/RoomTimeEventEntity';
import { updateRoomTimeEventEntity } from '../model/updateRoomTimeEventEntity';
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

	async update(roomTimeEventData: updateRoomTimeEventEntity) {
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
				status: roomTimeEventData.status ? roomTimeEventData.status : undefined,
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
				status: roomTimeEventData.status,
			},
		});

		console.log(response);

		let out: RoomTimeEventEntity = response;
		return out;
	}

	async delete(roomTimeEventId: string) {
		let response = await prisma.roomTimeEvent.update({
			where: {
				id: roomTimeEventId,
			},
			data: {
				status: 'ARCHIVED',
			},
		});

		return response;
	}

	async listAssociatedEventUserPresences(id: string) {
		// prisma RoomTimeEvents
		let data = await prisma.roomTimeEvent.findUnique({
			where: { id: id },
			select: {
				EventUserPresence: true,
			},
		});

		if (data) {
			let datas: EventUserPresenceEntity[] = [];
			data.EventUserPresence.forEach((data: EventUserPresenceEntity) => {
				let eventUserPresence: EventUserPresenceEntity = data;
				datas.push(eventUserPresence);
			});

			return datas;
		} else {
			throw new Error('no data');
		}
	}
}
