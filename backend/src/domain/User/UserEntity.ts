import { User } from '@prisma/client';

export default class UserEntity {
	id: number;
	email: string;
	password: string;
	name: string;
	surname: string;
	username: string;
	JMBAG: string;
	avatar_url: string;
	role: string;

	constructor(props: User) {
		// mozda je ID problem, kako zaobitci definiciju IDja?
		this.id = props.id;
		this.email = props.email;
		this.password = props.password;
		this.name = props.name;
		this.surname = props.surname;
		this.username = props.username;
		this.JMBAG = props.JMBAG;
		this.avatar_url = props.avatar_url;
		this.role = props.role;
	}

	validate() {
		console.log('test');

		if (this.password.length < 6) {
			console.log('ERROR password');
			throw new Error('invalid password');
		}
		if (!this.email) {
			console.log('ERROR email');
			throw new Error('invalid email');
		}
		if (!this.password) {
			console.log('ERROR password');
			throw new Error('invalid password');
		}
		if (!this.name) {
			console.log('ERROR name');
			throw new Error('invalid name');
		}
		if (!this.surname) {
			console.log('ERROR surname');
			throw new Error('invalid surname');
		}
		if (!this.username) {
			console.log('ERROR username');
			throw new Error('invalid username');
		}
		if (!this.JMBAG) {
			console.log('ERROR JMBAG');
			throw new Error('invalid JMBAG');
		}
		if (!this.avatar_url) {
			console.log('ERROR avatar_url');
			throw new Error('invalid avatar_url');
		}
		if (!this.role) {
			console.log('ERROR role');
			throw new Error('invalid role');
		}
	}
}
