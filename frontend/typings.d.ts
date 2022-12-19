export interface Student {
	id: Number;
	name: string;
	surname: string;
	email: string;
	username: string;
	JMBAG: string;
	avatar_url: string;
}

export interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}
