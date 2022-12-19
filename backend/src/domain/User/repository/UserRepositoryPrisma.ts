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

	async update(userData: UserEntity) {
		
		let updatedData = await prisma.user.update({
			
			where: {
				email: userData.email
			},
			data: {
				firstname: userData.firstname, 
				lastname: userData.lastname, 
				password: userData.password, 
				jmbag: userData.jmbag, 
				email: userData.email, 
				userRole: userData.userRole, 
				mentorID: userData.mentorID,
			},
		});		
		let rez = new UserEntity(updatedData);

		return rez;
		
	}

	// async getById(id: number) {
	// 	let data = await prisma.user.findUnique({ where: { id: id } });
	// 	let user = new UserEntity(data);
	// 	return user;
	// }

	async create(user: UserEntity) {
		let response = await prisma.user.create({
			data: {
				id: undefined,
				email: user.email,
				password: user.password,
				firstname: user.firstname,
				lastname: user.lastname,
				jmbag: user.jmbag,
				userRole: user.userRole, 
				mentorID: user.mentorID 
			}
		});

		console.log(response);

		let out = new UserEntity(response);
		return out;
	}

	async delete(userEmail: string) {
		let response = await prisma.user.delete({
			where: {
				email: userEmail
			}
		});

		return response;
	}
}