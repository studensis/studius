import { User } from '@prisma/client';
import UserEntity from '../UserEntity';

export abstract class UserRepository {
	async getAll(): Promise<UserEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: number): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
	async create(user: UserEntity): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
	async update(userData: UserEntity): Promise<UserEntity>{
		throw new Error('Method not implemented.');
	}
	async delete(userEmail: string): Promise<User>{
		throw new Error('Method not implemented.');
	}

}
