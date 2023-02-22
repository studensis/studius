import { PrismaClient } from '@prisma/client';
import { paginationType } from '../../pagination/paginationObj';
import { ContentEntity } from '../model/ContentEntity';
import { updateContentEntity } from '../model/updateContentEntity';
import { ContentRepository } from './ContentRepository';

const prisma = new PrismaClient();

export default class ContentRepositoryPrisma extends ContentRepository {
	async getAll(paginationInfo: paginationType) {
		// prisma Contents
		let datas = await prisma.content.findMany({
			skip: paginationInfo.objectsPerPage * paginationInfo.pageNumber,
			take: paginationInfo.objectsPerPage,
		});

		// map to ContentEntities
		let contents: ContentEntity[] = [];
		datas.forEach((data: ContentEntity) => {
			let content: ContentEntity = data;
			contents.push(content);
		});

		return contents;
	}

	async getById(id: string) {
		let data = await prisma.content.findUnique({ where: { id: id } });
		if (data) {
			let content: ContentEntity = data;
			return content;
		} else {
			throw new Error('no data');
		}
	}

	async update(contentData: updateContentEntity) {
		let updatedData = await prisma.content.update({
			where: {
				id: contentData.id,
			},
			data: {
				markdownText: contentData.markdownText
					? contentData.markdownText
					: undefined,
				plainText: contentData.plainText ? contentData.plainText : undefined,
				linkedEntity: contentData.linkedEntity
					? contentData.linkedEntity
					: undefined,
				linkedEntityId: contentData.linkedEntityId
					? contentData.linkedEntityId
					: undefined,
				date: contentData.date ? contentData.date : undefined,
			},
		});
		let rez: ContentEntity = updatedData;

		return rez;
	}

	async create(content: ContentEntity) {
		let response = await prisma.content.create({
			data: {
				markdownText: content.markdownText,
				plainText: content.plainText,
				linkedEntity: content.linkedEntity,
				linkedEntityId: content.linkedEntityId,
				date: content.date,
				file: Buffer.from('0'),
			},
		});

		let out: ContentEntity = response;
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
