import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';
import UserEntity from '../UserEntity';
import { UserRole } from '../UserRole';
import { UserRepository } from './UserRepository';

const prisma = new PrismaClient();

export default class UserRepositoryPrisma extends UserRepository {
	async getAll() {
		// prisma Users
		let datas = await prisma.user.findMany();

		// map to UserEntities
		let users: UserEntity[] = [];
		datas.forEach((data) => {
			let user = new UserEntity(data);
			users.push(user);
		});

		return users;
	}

	// async getById(id: number) {
	// 	let data = await prisma.user.findUnique({ where: { id: id } });
	// 	let user = new UserEntity(data);
	// 	return user;
	// }

	async create(user: UserEntity) {
		let response = await prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				firstname: user.firstname,
				lastname: user.lastname,
				jmbag: user.jmbag,
				status: UserRole.STUDENT, 
				mentorID: user.mentorID
			}
		});

		console.log(response);

		let out = new UserEntity(response);
		return out;
	}
}