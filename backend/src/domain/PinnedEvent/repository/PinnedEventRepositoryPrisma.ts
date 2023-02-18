import { PrismaClient } from '@prisma/client';
import { PinnedEventEntity } from '../model/PinnedEventEntity';
import { updatePinnedEventEntity } from '../model/updatePinnedEventEntity';
import { PinnedEventRepository } from './PinnedEventRepository';

const prisma = new PrismaClient();

export default class PinnedEventRepositoryPrisma extends PinnedEventRepository {
	async getAll() {
		// prisma PinnedEvents
		let datas = await prisma.pinnedEvent.findMany();

		// map to PinnedEventEntities
		let pinnedEvents: PinnedEventEntity[] = [];
		datas.forEach((data: PinnedEventEntity) => {
			let pinnedEvent: PinnedEventEntity = data;
			pinnedEvents.push(pinnedEvent);
		});

		return pinnedEvents;
	}

	async getById(id: string) {
		let data = await prisma.pinnedEvent.findUnique({
			where: { id: id },
		});
		if (data) {
			let pinnedEvent: PinnedEventEntity = data;
			return pinnedEvent;
		} else {
			throw new Error('no data');
		}
	}

	async update(pinnedEventData: updatePinnedEventEntity) {
		let updatedData = await prisma.pinnedEvent.update({
			where: {
				id: pinnedEventData.id,
			},
			data: {
				eventId: pinnedEventData.eventId,
				subjectId: pinnedEventData.subjectId,
			},
		});
		let rez: PinnedEventEntity = updatedData;

		return rez;
	}

	async create(pinnedEvent: PinnedEventEntity) {
		let response = await prisma.pinnedEvent.create({
			data: {
				eventId: pinnedEvent.eventId,
				subjectId: pinnedEvent.subjectId,
			},
		});

		console.log(response);

		let out: PinnedEventEntity = response;
		return out;
	}

	async delete(pinnedEventId: string) {
		let response = await prisma.pinnedEvent.delete({
			where: {
				id: pinnedEventId,
			},
		});

		return response;
	}

	async getBySubjectId(subjectId: string) {
		let datas = await prisma.pinnedEvent.findMany({
			where: { subjectId: subjectId },
		});
		let pinnedEvents: PinnedEventEntity[] = [];
		if (datas) {
			datas.forEach((data: PinnedEventEntity) => {
				let pinnedEvent: PinnedEventEntity = data;
				pinnedEvents.push(pinnedEvent);
			});
			return pinnedEvents;
		} else {
			throw new Error('no data');
		}
	}

	async deleteByEventId(eventId: string) {
		let response = await prisma.pinnedEvent.deleteMany({
			where: {
				eventId: eventId,
			},
		});

		return response;
	}

	async deleteBySubjectId(subjectId: string) {
		let response = await prisma.pinnedEvent.deleteMany({
			where: {
				subjectId: subjectId,
			},
		});

		return response;
	}
}