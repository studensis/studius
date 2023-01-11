import { PrismaClient } from '@prisma/client';
import { RoomTimeEventEntity } from '../../RoomTimeEvent/model/RoomTimeEventEntity';
import { EventUserPresenceEntity } from '../model/EventUserPresenceEntity';
import { updateEventUserPresenceEntity } from '../model/updateEventUserPresenceEntity';
import { EventUserPresenceRepository } from './EventUserPresenceRepository';

const prisma = new PrismaClient();

export default class EventUserPresenceRepositoryPrisma extends EventUserPresenceRepository {
	async getAll() {
		// prisma EventUserPresences
		let datas = await prisma.eventUserPresence.findMany();

		// map to EventUserPresenceEntities
		let eventUserPresences: EventUserPresenceEntity[] = [];
		datas.forEach((data: EventUserPresenceEntity) => {
			let eventUserPresence: EventUserPresenceEntity = data;
			eventUserPresences.push(eventUserPresence);
		});

		return eventUserPresences;
	}

	async getById(id: string) {
		let data = await prisma.eventUserPresence.findUnique({
			where: { id: id },
		});
		if (data) {
			let eventUserPresence: EventUserPresenceEntity = data;
			return eventUserPresence;
		} else {
			throw new Error('no data');
		}
	}

	async update(eventUserPresenceData: updateEventUserPresenceEntity) {
		let updatedData = await prisma.eventUserPresence.update({
			where: {
				id: eventUserPresenceData.id,
			},
			data: {
				presenceStatus: eventUserPresenceData.presenceStatus,
			},
		});
		let rez: EventUserPresenceEntity = updatedData;

		return rez;
	}

	async create(eventUserPresence: EventUserPresenceEntity) {
		let response = await prisma.eventUserPresence.create({
			data: {
				presenceStatus: eventUserPresence.presenceStatus,
				roomTimeEventId: eventUserPresence.roomTimeEventId,
				userId: eventUserPresence.userId,
			},
		});

		console.log(response);

		let out: EventUserPresenceEntity = response;
		return out;
	}

	async delete(eventUserPresenceId: string) {
		let response = await prisma.eventUserPresence.delete({
			where: {
				id: eventUserPresenceId,
			},
		});

		return response;
	}

	async getAssociatedRoomTimeEvent(id: string) {
		let eventUserPresence = await prisma.eventUserPresence.findUnique({
			where: { id: id },
			select: {
				roomTimeEventId: true,
			},
		});

		if (eventUserPresence) {
			let data = await prisma.roomTimeEvent.findUnique({
				where: { id: eventUserPresence.roomTimeEventId },
			});
			if (data) {
				let roomTimeEvent: RoomTimeEventEntity = data;
				return roomTimeEvent;
			} else {
				throw new Error('no data');
			}
		} else {
			throw new Error('no data');
		}
	}
}
