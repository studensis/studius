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

	async getById(id: number) {
		let data = await prisma.content.findUnique({ where: { id: id } });
		let content = new ContentEntity(data);
		return content;
	}

	async create(content: ContentEntity) {
		let response = await prisma.content.create({
			data: {
				id: undefined,
			    Markdown_Text: "Markdaun Tekst",
			    plain_text: "plejn tekst",
			    date: "osmi osmi",                  // Date   
			}
		});

		console.log(response);

		let out = new ContentEntity(response);
		return out;
	}
}