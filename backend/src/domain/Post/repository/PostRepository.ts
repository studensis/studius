import { paginationType } from '../../pagination/paginationObj';
import { PostEntity } from '../model/PostEntity';
import { updatePostEntity } from '../model/updatePostEntity';

export abstract class PostRepository {
	async getAll(): Promise<PostEntity[]> {
		throw new Error('Method not implemented.');
	}
	async listPaginated(paginationInfo: paginationType): Promise<PostEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}
	async create(post: PostEntity): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}
	async update(post: updatePostEntity): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(postId: string): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}
}
