import { PrismaClient } from '@prisma/client';
import ContentEntity from '../ContentEntity';
import { ContentRepository } from './ContentRepository';

const prisma = new PrismaClient();

export default class ContentRepositoryPrisma extends ContentRepository {
	async getAll() {
		// prisma Contents
		let datas = await prisma.content.findMany();

		// map to ContentEntities
		let contents: ContentEntity[] = [];
		datas.forEach((data) => {
			let content = new ContentEntity(data);
			contents.push(content);
		});

		return contents;
	}

	async getById(id: string) {
		let data = await prisma.content.findUnique({ where: { id: id } });
		if (data) {
			let content = new ContentEntity(data);
			return content;
		} else {
			throw new Error('no data');
		}
	}

	async update(contentData: ContentEntity) {
		let updatedContent: any = {};

		if (contentData.markdownText)
			updatedContent['markdownText'] = contentData.markdownText;
		if (contentData.plainText)
			updatedContent['plainText'] = contentData.plainText;
		if (contentData.linkedEntity)
			updatedContent['linkedEntity'] = contentData.linkedEntity;
		if (contentData.linkedEntityId)
			updatedContent['linkedEntityId'] = contentData.linkedEntityId;
		if (contentData.date) updatedContent['date'] = contentData.date;

		let updatedData = await prisma.content.update({
			where: {
				id: contentData.id,
			},
			data: {
				markdownText: updatedContent.markdownText,
				plainText: updatedContent.plainText,
				linkedEntity: updatedContent.linkedEntity,
				linkedEntityId: updatedContent.linkedEntityId,
				date: updatedContent.date,
			},
		});
		let rez = new ContentEntity(updatedData);

		return rez;
	}

	async create(content: ContentEntity) {
		let response = await prisma.content.create({
			data: {
				id: content.id,
				markdownText: content.markdownText,
				plainText: content.plainText,
				linkedEntity: content.linkedEntity,
				linkedEntityId: content.linkedEntityId,
				date: content.date,
			},
		});

		console.log(response);

		let out = new ContentEntity(response);
		return out;
	}

	async delete(contentId: string) {
		let response = await prisma.content.delete({
			where: {
				id: contentId,
			},
		});

		return response;
	}
}
