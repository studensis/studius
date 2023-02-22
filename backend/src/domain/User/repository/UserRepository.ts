import { paginationType } from '../../pagination/paginationObj';
import { updateUserEntity } from '../model/updateUserEntity';
import { UserEntity } from '../model/UserEntity';

export abstract class UserRepository {
	async getAll(paginationInfo: paginationType): Promise<UserEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<UserEntity | null> {
		throw new Error('Method not implemented.');
	}
	async create(user: UserEntity): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
	async update(userData: updateUserEntity): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(userId: string): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
	async getByEmail(email: string): Promise<UserEntity | null> {
		throw new Error('Method not implemented.');
	}
	async listMentees(input: {
		pageNumber: number;
		objectsPerPage: number;
		mentorId: string;
	}): Promise<UserEntity[] | null> {
		throw new Error('Method not implemented.');
	}
	async getByGoogleId(id: string): Promise<UserEntity | null> {
		throw new Error('Method not implemented.');
	}
}
