import { EnrollmentEntity } from '../../Enrollment/model/EnrollmentEntity';
import { updateEnrollmentEntity } from '../../Enrollment/model/updateEnrollmentEntity';
import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
import { SubjectEntity } from '../../Subject/model/SubjectEntity';
import createUserInteractor from '../interactors/createUserInteractor';
import enrollUserIneractor from '../interactors/enrollUserIneractor';
import getUserByEmailInteractor from '../interactors/getUserByEmailInteractor';
import getUserInteractor from '../interactors/getUserInteractor';
import listEnrolledSubjectsInteractor from '../interactors/listEnrolledSubjectsInteractor';
import listMenteesInteractor from '../interactors/listMenteeInteractor';
import listUsersInteractor from '../interactors/listUsersInteractor';
import updateEnrollmentInteractor from '../interactors/updateEnrollmentInteractor';
import updateUserInteractor from '../interactors/updateUserInteractor';
import { updateUserEntity } from '../model/updateUserEntity';
import { UserEntity } from '../model/UserEntity';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';

let userRepo = new UserRepositoryPrisma();
let enrollmentRepo = new EnrollmentRepositoryPrisma();

let testUser: UserEntity = {
	id: '',
	firstname: 'Test',
	lastname: 'User',
	password: 'password',
	jmbag: '0036500000',
	email: 'testuser@fer.hr',
	userRole: 'ADMIN',
	mentorID: null,
};

let newUser: UserEntity;
let id: string;

test('User create', async () => {
	newUser = await createUserInteractor(userRepo, testUser);
	expect(newUser).not.toBeNull();
});

test('User update', async () => {
	id = newUser.id;
	let updatedUser: updateUserEntity = {
		id: id,
		lastname: 'Updated User',
	};
	newUser = await updateUserInteractor(userRepo, updatedUser);
	expect(newUser).not.toBeNull();
});

test('User get', async () => {
	let singleUser: UserEntity | null = await getUserInteractor(userRepo, id);
	expect(singleUser).not.toBeNull();
});

test('User list', async () => {
	let userList: UserEntity[] = await listUsersInteractor(userRepo);
	expect(userList).not.toBeNull();
});

test('User get by email', async () => {
	let email: string = newUser.email;
	let result = await getUserByEmailInteractor(userRepo, email);
	expect(result).not.toBeNull();
});

let newEnrollment: EnrollmentEntity;
let enrollmentData: EnrollmentEntity;

test('User enroll', async () => {
	let enrollmentData: EnrollmentEntity = {
		id: '',
		userId: newUser.id,
		subjectId: '7ccba04d-be83-4ae2-84d1-d74ef99a164e',
		enrollmentDate: null,
		roleTitle: 'STUDENT',
		status: 'ACTIVE',
	};

	newEnrollment = await enrollUserIneractor(enrollmentData, enrollmentRepo);
	expect(newEnrollment).not.toBeNull();
});

test('Enrollment update', async () => {
	let updatedEnrollment: updateEnrollmentEntity = {
		id: newEnrollment.id,
		userId: newEnrollment.userId,
		subjectId: newEnrollment.subjectId,
		roleTitle: 'PROFESSOR',
	};
	let response: EnrollmentEntity = await updateEnrollmentInteractor(
		enrollmentRepo,
		updatedEnrollment
	);
	expect(response).not.toBeNull();
});

let enrollmentList: (EnrollmentEntity & { subject: SubjectEntity })[];

test('User enrollment list', async () => {
	id = newUser.id;
	enrollmentList = await listEnrolledSubjectsInteractor(id, enrollmentRepo);
	expect(enrollmentList).not.toBeNull();
});

let mentees: UserEntity[] | null;

test('User mentee list', async () => {
	id = newUser.id;
	mentees = await listMenteesInteractor(userRepo, id);
	expect(mentees).not.toBeNull();
});
