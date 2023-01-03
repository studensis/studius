import { string } from "zod";
import { updateUserEntity } from "./updateUserEntity";
import { UserEntity } from "./UserEntity";

export function validate(user:UserEntity | updateUserEntity){
    
    if (!user.email) {
        console.log('ERROR email');
        throw new Error('invalid email');
    }
    if (!user.password) {
        console.log('ERROR password');
        throw new Error('invalid password');
    }
    if (user.password.length < 6) {
        console.log('ERROR password');
        throw new Error('invalid password');
    }
    if (!user.firstname) {
        console.log('ERROR name');
        throw new Error('invalid name');
    }
    if (!user.lastname) {
        console.log('ERROR surname');
        throw new Error('invalid surname');
    }
    if (!user.userRole) {
        console.log('ERROR status');
        throw new Error('invalid status');
    }
    if (user.jmbag && user.jmbag?.length < 10) {
        console.log('ERROR JMBAG');
        throw new Error('invalid JMBAG');
    }
}