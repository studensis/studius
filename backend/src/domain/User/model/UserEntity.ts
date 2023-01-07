import { UserRole } from './UserRole';

export type UserEntity = {
	id: string;
	firstname: string;
	lastname: string;
	password: string;
	jmbag: string | null;
	email: string;
	userRole: UserRole;
	mentorID: string | null;
};
