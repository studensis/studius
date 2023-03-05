import { EnrollmentEntity } from '../../Enrollment/model/EnrollmentEntity';
import { updateEnrollmentEntity } from '../../Enrollment/model/updateEnrollmentEntity';
import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
import createSubjectInteractor from '../../Subject/interactors/createSubjectInteractor';
import deleteSubjectInteractor from '../../Subject/interactors/deleteSubjectInteractor';
import { SubjectEntity } from '../../Subject/model/SubjectEntity';
import SubjectRepositoryPrisma from '../../Subject/repository/SubjectRepositoryPrisma';
import createUserInteractor from '../interactors/createUserInteractor';
import deleteUserInteractor from '../interactors/deleteUserInteractor';
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
let subjectRepo = new SubjectRepositoryPrisma();

let testUser: UserEntity = {
	id: '',
	firstname: 'Test',
	lastname: 'User',
	password: 'password',
	jmbag: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	email:
		Buffer.from(Math.random().toString()).toString('base64').substring(5, 15) +
		'@fer.hr',
	userRole: 'DEFAULT',
	mentorID: null,
	avatar: null,
	googleUserId: null,
};
let testSubject: SubjectEntity = {
	id: '',
	title: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	description: '',
	ectsBod: '22',
	semester: 'WINTER',
	status: 'ACTIVE',
	contentId: [],
};

let newUser: UserEntity;
let newSubject: SubjectEntity;
let newEnrollment: EnrollmentEntity;
let userId: string;
let subjectId: string;

test('User create', async () => {
	newUser = await createUserInteractor(userRepo, testUser);
	expect(newUser).not.toBeNull();
});
test('Subject create', async () => {
	newSubject = await createSubjectInteractor(subjectRepo, testSubject);
	expect(newSubject).not.toBeNull();
});

test('User update', async () => {
	userId = newUser.id;
	let updatedUser: updateUserEntity = {
		id: userId,
		lastname: 'Updated User',
	};
	newUser = await updateUserInteractor(userRepo, updatedUser);
	expect(newUser).not.toBeNull();
});

test('User get', async () => {
	let singleUser: UserEntity | null = await getUserInteractor(userRepo, userId);
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

test('User enroll', async () => {
	userId = newUser.id;
	subjectId = newSubject.id;
	let enrollmentData: EnrollmentEntity = {
		id: '',
		userId: userId,
		subjectId: subjectId,
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
	userId = newUser.id;
	enrollmentList = await listEnrolledSubjectsInteractor(
		enrollmentRepo,
		undefined,
		undefined,
		userId
	);
	expect(enrollmentList).not.toBeNull();
});

let mentees: UserEntity[] | null;

test('User mentee list', async () => {
	userId = newUser.id;
	mentees = await listMenteesInteractor(userRepo, userId);
	expect(mentees).not.toBeNull();
});

let deletedUser: UserEntity;

test('User delete', async () => {
	userId = newUser.id;
	deletedUser = await deleteUserInteractor(userId, userRepo, enrollmentRepo);
	expect(deletedUser).not.toBeNull();
});
test('Subject delete', async () => {
	subjectId = newSubject.id;
	let deleteSubject = await deleteSubjectInteractor(subjectId, subjectRepo);
	expect(deleteSubject).not.toBeNull();
});
