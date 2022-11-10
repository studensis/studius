import { PrismaClient, User } from '@prisma/client';
import IUserService from '../../interfaces/user.interface';

class UserService implements IUserService {
	public static prisma = new PrismaClient();

	public static createUser = async (newUser: User) => {
		return await UserService.prisma.user.create({
			data: newUser
		});
	};

	public static deleteUserById = async (userId: number) => {
		return await UserService.prisma.user.delete({
			where: {
				id: userId
			}
		});
	};

	public static updateUser = async (updatedUser: User) => {
		return await UserService.prisma.user.update({
			where: {
				id: updatedUser.id
			},
			data: updatedUser
		});
	};

	public static findById = async (userId: number) => {
		return await UserService.prisma.user.findUnique({
			where: {
				id: userId
			}
		});
	};

	public static getAllUsers = async () => {
		return await UserService.prisma.user.findMany();
	};

	public static updateAvatarById = async (
		userId: number,
		avatar_url: string
	) => {
		return await UserService.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				avatar_url: avatar_url
			}
		});
	};
}

export { UserService };
