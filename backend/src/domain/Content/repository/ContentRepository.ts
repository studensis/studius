import ContentEntity from '../ContentEntity';

export abstract class ContentRepository {
	async getAll(): Promise<ContentEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: number): Promise<ContentEntity> {
		throw new Error('Method not implemented.');
	}
	async create(content: ContentEntity): Promise<ContentEntity> {
		throw new Error('Method not implemented.');
	}
}
