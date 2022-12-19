import { PrismaClient } from '@prisma/client';
import EventEntity from '../EventEntity';
import { EventRepository } from './EventRepository';

const prisma = new PrismaClient();

export default class EventRepositoryPrisma extends EventRepository {
	async getAll() {
		// prisma Events
		let datas = await prisma.event.findMany();

		// map to EventEntities
		let events: EventEntity[] = [];
		datas.forEach((data) => {
			let event = new EventEntity(data);
			events.push(event);
		});

		return events;
	}

	async getById(id: string) {
		let data = await prisma.event.findUnique({ where: { id: id } });
		let event = new EventEntity(data);
		return event;
	}

	async create(event: EventEntity) {
		let response = await prisma.event.create({
			data: {
				id: event.id,
			    title: event.title,
			    description: event.description,
			    linkedEntity: event.linkedEntity,
			    linkedEntityId: event.linkedEntityId,
			}
		});

		console.log(response);

		let out = new EventEntity(response);
		return out;
	}
}