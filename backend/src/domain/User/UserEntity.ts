import { User } from '@prisma/client';
import { UserRole } from './UserRole';

export default class UserEntity {
	id: string;
	firstname: string;
	lastname: string;
	password: string;
	jmbag: string;
	email: string;
	userRole: UserRole;
	mentorID:  string;


	constructor(props: User) {
		// mozda je ID problem, kako zaobitci definiciju IDja?
		this.id = props.id;
		this.password = props.password;
		this.firstname = props.firstname;
		this.lastname = props.lastname;
		this.jmbag = props.jmbag;
		this.email = props.email;
		this.userRole = props.userRole;
		this.mentorID = props.mentorID;
		// izbacuje error za zadnja tri atributa
	}

	validate() {
		
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
		if (!this.firstname) {
			console.log('ERROR name');
			throw new Error('invalid name');
		}
		if (!this.lastname) {
			console.log('ERROR surname');
			throw new Error('invalid surname');
		}
		if (!this.userRole) {
			console.log('ERROR status');
			throw new Error('invalid status');
		}
		if (!this.jmbag) {
			console.log('ERROR JMBAG');
			throw new Error('invalid JMBAG');
		}
		if(this.jmbag.length < 10){
			console.log('ERROR jmbag length');
			throw new Error('invalid JMBAG length')
		}
	}
}