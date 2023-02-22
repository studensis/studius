import { ContentEntity } from '../model/ContentEntity';
import { updateContentEntity } from '../model/updateContentEntity';

export abstract class ContentRepository {
	async getAll(): Promise<ContentEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<ContentEntity> {
		throw new Error('Method not implemented.');
	}
	async create(content: ContentEntity): Promise<ContentEntity> {
		throw new Error('Method not implemented.');
	}
	async update(content: updateContentEntity): Promise<ContentEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(contentId: string): Promise<ContentEntity> {
		throw new Error('Method not implemented.');
	}
}
