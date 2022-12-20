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

		let newData : any = {}

		if(userData.firstname)newData["firstname"] = userData.firstname;
		if(userData.lastname)newData["lastname"] = userData.lastname;
		if(userData.password)newData["password"] = userData.password;
		if(userData.jmbag)newData["jmbag"] = userData.jmbag;
		if(userData.email)newData["email"] = userData.email;
		if(userData.userRole)newData["userRole"] = userData.userRole;
		if(userData.mentorID)newData["mentorID"] = userData.mentorID;

		
		let updatedData = await prisma.user.update({
			
			where: {
				id: userData.id
			},
			data: {
				firstname: newData.firstname, 
				lastname: newData.lastname, 
				password: newData.password, 
				jmbag: newData.jmbag, 
				email: newData.email, 
				userRole: newData.userRole, 
				mentorID: newData.mentorID,
			},
		});		
		let rez = new UserEntity(updatedData);

		return rez;
		
	}

	async getById(id: string) {
		let data = await prisma.user.findUnique({ where: { id: id } });
		let user = new UserEntity(data);
		return user;
	}

	async create(user: UserEntity) {

		let response = await prisma.user.create({
			data: {
				id: user.id,
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

	async delete(userId: string) {
		let response = await prisma.user.delete({
			where: {
				id: userId
			}
		});

		let rez = new UserEntity(response)

		return rez;
	}
}