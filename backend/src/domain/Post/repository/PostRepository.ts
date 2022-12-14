import PostEntity from '../PostEntity';

export abstract class PostRepository {
	async getAll(): Promise<PostEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: number): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}
	async create(post: PostEntity): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}
}
