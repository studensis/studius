import { User } from '@prisma/client';

export default abstract class IUserService {
	static createUser: (newUser: User) => Promise<User>;
	static deleteUserById: (userId: number) => Promise<User>;
	static updateUser: (updatedUser: User) => Promise<User>;
	static findById: (userId: number) => Promise<User>;
	static getAllUsers: () => Promise<User[]>;
	static updateAvatarById: (
		userId: number,
		avatar_url: string
	) => Promise<User>;
}
