import { ContentEntity } from '../ContentEntity';
import { updateContentEntity } from '../updateContentEntity';

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
	async update(content: updateContentEntity): Promise<updateContentEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(contentId: string): Promise<ContentEntity> {
		throw new Error('Method not implemented.');
	}
}
