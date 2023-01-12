import { PrismaClient } from '@prisma/client';
import { RoomTimeEventEntity } from '../../RoomTimeEvent/model/RoomTimeEventEntity';
import { EventEntity } from '../model/EventEntity';
import { updateEventEntity } from '../model/updateEventEntity';
import { EventRepository } from './EventRepository';

const prisma = new PrismaClient();

export default class EventRepositoryPrisma extends EventRepository {
	async getAll() {
		// prisma Events
		let datas = await prisma.event.findMany();

		// map to EventEntities
		let events: EventEntity[] = [];
		datas.forEach((data: EventEntity) => {
			let event: EventEntity = data;
			events.push(event);
		});

		return events;
	}

	async getById(id: string) {
		let data = await prisma.event.findUnique({ where: { id: id } });
		if (data) {
			let event: EventEntity = data;
			return event;
		} else {
			throw new Error('no data');
		}
	}

	async update(eventData: updateEventEntity) {
		let updatedData = await prisma.event.update({
			where: {
				id: eventData.id,
			},
			data: {
				title: eventData.title ? eventData.title : undefined,
				description: eventData.description ? eventData.description : undefined,
				linkedEntity: eventData.linkedEntity
					? eventData.linkedEntity
					: undefined,
				linkedEntityId: eventData.linkedEntityId
					? eventData.linkedEntityId
					: undefined,
			},
		});
		let rez: EventEntity = updatedData;

		return rez;
	}

	async create(event: EventEntity) {
		let response = await prisma.event.create({
			data: {
				title: event.title,
				description: event.description,
				linkedEntity: event.linkedEntity,
				linkedEntityId: event.linkedEntityId,
			},
		});

		console.log(response);

		let out: EventEntity = response;
		return out;
	}

	async delete(eventId: string) {
		let response = await prisma.event.delete({
			where: {
				id: eventId,
			},
		});

		return response;
	}

	async archive(eventId: string) {
		let response = await prisma.event.update({
			where: {
				id: eventId,
			},
			data: {
				status: 'ARCHIVED',
			},
		});

		let archiveRTEs = await prisma.roomTimeEvent.updateMany({
			where: {
				eventId: response.id,
			},
			data: {
				status: 'ARCHIVED',
			},
		});

		return response;
	}

	async listAssociatedRoomTimeEvents(id: string) {
		let data = await prisma.event.findUnique({
			where: { id: id },
			select: {
				RoomTimeEvent: true,
			},
		});

		if (data) {
			let datas: RoomTimeEventEntity[] = [];
			data.RoomTimeEvent.forEach((data: RoomTimeEventEntity) => {
				let eventUserPresence: RoomTimeEventEntity = data;
				datas.push(eventUserPresence);
			});

			return datas;
		} else {
			throw new Error('no data');
		}
	}
}
