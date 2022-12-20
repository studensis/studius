import ContentEntity from '../ContentEntity';

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
}