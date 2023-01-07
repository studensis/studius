import { PrismaClient } from '@prisma/client';
import EventUserPresenceEntity from '../model/EventUserPresenceEntity';
import { EventUserPresenceRepository } from './EventUserPresenceRepository';

const prisma = new PrismaClient();

export default class EventUserPresenceRepositoryPrisma extends EventUserPresenceRepository {
	async getAll() {
		// prisma EventUserPresences
		let datas = await prisma.eventUserPresence.findMany();

		// map to EventUserPresenceEntities
		let eventUserPresences: EventUserPresenceEntity[] = [];
		datas.forEach((data) => {
			let eventUserPresence = new EventUserPresenceEntity(data);
			eventUserPresences.push(eventUserPresence);
		});

		return eventUserPresences;
	}

	async getById(id: string) {
		let data = await prisma.eventUserPresence.findUnique({
			where: { id: id },
		});
		if (data) {
			let eventUserPresence = new EventUserPresenceEntity(data);
			return eventUserPresence;
		} else {
			throw new Error('no data');
		}
	}

	async update(eventUserPresenceData: EventUserPresenceEntity) {
		let updatedEventUserPresence: any = {};

		if (eventUserPresenceData.presenceStatus)
			updatedEventUserPresence['presenceStatus'] =
				eventUserPresenceData.presenceStatus;

		let updatedData = await prisma.eventUserPresence.update({
			where: {
				id: eventUserPresenceData.id,
			},
			data: {
				presenceStatus: updatedEventUserPresence.presenceStatus,
			},
		});
		let rez = new EventUserPresenceEntity(updatedData);

		return rez;
	}

	async create(eventUserPresence: EventUserPresenceEntity) {
		let response = await prisma.eventUserPresence.create({
			data: {
				id: eventUserPresence.id,
				presenceStatus: eventUserPresence.presenceStatus,
				roomTimeEventId: eventUserPresence.roomTimeEventId,
				userId: eventUserPresence.userId,
			},
		});

		console.log(response);

		let out = new EventUserPresenceEntity(response);
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
}
