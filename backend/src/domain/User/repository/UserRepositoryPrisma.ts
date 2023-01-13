import { PrismaClient } from '@prisma/client';
import { updateUserEntity } from '../model/updateUserEntity';
import { UserEntity } from '../model/UserEntity';
import { UserRepository } from './UserRepository';

const prisma = new PrismaClient();

export default class UserRepositoryPrisma extends UserRepository {
	async getAll() {
		// prisma Users
		let datas = await prisma.user.findMany();

		// map to UserEntities
		let users: UserEntity[] = [];
		datas.forEach((data: UserEntity) => {
			let user: UserEntity = data;
			users.push(user);
		});

		return users;
	}

	async update(newData: updateUserEntity) {
		let updatedData = await prisma.user.update({
			where: {
				id: newData.id,
			},
			data: {
				firstname: newData.firstname ? newData.firstname : undefined,
				lastname: newData.lastname ? newData.lastname : undefined,
				password: newData.password ? newData.password : undefined,
				jmbag: newData.jmbag ? newData.jmbag : undefined,
				email: newData.email ? newData.email : undefined,
				userRole: newData.userRole ? newData.userRole : undefined,
				mentorID: newData.mentorID ? newData.mentorID : undefined,
			},
		});
		let rez: UserEntity = updatedData;

		return rez;
	}

	async getById(id: string) {
		let data = await prisma.user.findUnique({ where: { id: id } });
		if (data) {
			let user: UserEntity = data;
			return user;
		} else {
			return null;
		}
	}

	async create(user: UserEntity) {
		let response = await prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				firstname: user.firstname,
				lastname: user.lastname,
				jmbag: user.jmbag,
				userRole: user.userRole,
				mentorID: user.mentorID,
			},
		});

		console.log(response);

		let out: UserEntity = response;
		return out;
	}

	async delete(userId: string) {
		let response = await prisma.user.delete({
			where: {
				id: userId,
			},
		});

		let rez: UserEntity = response;

		return rez;
	}

	async getByEmail(email: string): Promise<UserEntity | null> {
		console.log(email);
		let data = await prisma.user.findFirst({ where: { email: email } });
		if (data) {
			let user: UserEntity = data;
			return user;
		} else {
			return null;
		}
	}
	async listMentees(id: string) {
		let query = await prisma.user.findMany({
			where: {
				mentorID: id,
			},
		});
		let mentees: UserEntity[] = [];
		query.forEach((user: UserEntity) => {
			mentees.push(user);
		});

		return mentees;
	}
}
