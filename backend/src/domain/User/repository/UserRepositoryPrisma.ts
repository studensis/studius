import { PrismaClient } from '@prisma/client';
import { paginationType } from '../../pagination/paginationObj';
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
	async listPaginated(paginationInfo: paginationType) {
		// prisma Users
		let datas = await prisma.user.findMany({
			skip: paginationInfo.objectsPerPage * paginationInfo.pageNumber,
			take: paginationInfo.objectsPerPage,
		});

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
				googleUserId:
					newData.googleUserId !== undefined ? newData.googleUserId : undefined,
				avatar: newData.avatar !== undefined ? newData.avatar : undefined,
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
				avatar: user.avatar,
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
	async listMentees(mentorId: string) {
		let query = await prisma.user.findMany({
			where: {
				mentorID: mentorId,
			},
		});
		let mentees: UserEntity[] = [];
		query.forEach((user: UserEntity) => {
			mentees.push(user);
		});

		return mentees;
	}

	async getByGoogleId(id: string): Promise<UserEntity | null> {
		let query = await prisma.user.findUnique({
			where: {
				googleUserId: id,
			},
		});
		return query;
	}
}
