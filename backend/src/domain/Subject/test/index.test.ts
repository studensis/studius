import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
import createUserInteractor from '../../User/interactors/createUserInteractor';
import deleteUserInteractor from '../../User/interactors/deleteUserInteractor';
import { UserEntity } from '../../User/model/UserEntity';
import UserRepositoryPrisma from '../../User/repository/UserRepositoryPrisma';
import createSubjectInteractor from '../interactors/createSubjectInteractor';
import deleteSubjectInteractor from '../interactors/deleteSubjectInteractor';
import getSubjectInteractor from '../interactors/getSubjectInteractor';
import listSubjectsInteractor from '../interactors/listSubjectsInteractor';
import updateSubjectInteractor from '../interactors/updateSubjectInteractor';
import { SubjectEntity } from '../model/SubjectEntity';
import { updateSubjectEntity } from '../model/updateSubjectEntity';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';

const subjectRepo = new SubjectRepositoryPrisma();
let enrollmentRepo = new EnrollmentRepositoryPrisma();
let userRepo = new UserRepositoryPrisma();
let testSubject: SubjectEntity = {
	id: '',
	title: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	description: '',
	ectsBod: '123',
	contentId: [],
	status: 'ACTIVE',
	semester: 'SUMMER',
};
let newSubject: SubjectEntity;
let newUser: UserEntity;
let subjectId: string;
let userId: string;

//
//
//
//
// kreacija User-a potrebnog za Subject CRUD
test('User create', async () => {
	newUser = await createUserInteractor(userRepo, {
		id: '',
		password: '123456789',
		firstname: 'test',
		lastname: 'testic',
		email:
			Buffer.from(Math.random().toString())
				.toString('base64')
				.substring(5, 15) + '@fer.hr',
		userRole: 'DEFAULT',
		jmbag: Buffer.from(Math.random().toString())
			.toString('base64')
			.substring(5, 15),
		mentorID: null,
	});
	userId = newUser.id;
	expect(newUser).not.toBeNull();
});

//
//
//
// Subject CRUD
test('Subject create', async () => {
	newSubject = await createSubjectInteractor(subjectRepo, testSubject);
	expect(newSubject).not.toBeNull();
});

test('Subject update', async () => {
	subjectId = newSubject.id;
	userId = newUser.id;
	let updateSubject: updateSubjectEntity = {
		id: subjectId,
		title: 'updated',
	};
	newSubject = await updateSubjectInteractor(
		userId,
		'SUPERADMIN',
		enrollmentRepo,
		subjectRepo,
		updateSubject
	);
	expect(newSubject).not.toBeNull();
});
test('Subject get', async () => {
	subjectId = newSubject.id;
	let getSubject: SubjectEntity | null = await getSubjectInteractor(
		subjectRepo,
		subjectId
	);
	expect(getSubject).not.toBeNull();
});

test('Subject list', async () => {
	let izlaz: SubjectEntity[] = await listSubjectsInteractor(subjectRepo);
	expect(izlaz).not.toBeNull();
});

//
//
//
// brisanje
test('Subject delete', async () => {
	subjectId = newSubject.id;
	let deleteSubject: SubjectEntity = await deleteSubjectInteractor(
		subjectId,
		subjectRepo
	);
	expect(deleteSubject).not.toBeNull();
});
test('User delete', async () => {
	userId = newUser.id;
	let deleteUser: UserEntity = await deleteUserInteractor(
		userId,
		userRepo,
		enrollmentRepo
	);
	expect(deleteUser).not.toBeNull();
});
