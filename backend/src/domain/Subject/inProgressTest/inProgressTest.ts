// import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
// import createUserInteractor from '../../User/interactors/createUserInteractor';
// import deleteUserInteractor from '../../User/interactors/deleteUserInteractor';
// import { UserEntity } from '../../User/model/UserEntity';
// import UserRepositoryPrisma from '../../User/repository/UserRepositoryPrisma';
// import createSubjectInteractor from '../interactors/createSubjectInteractor';
// import deleteSubjectInteractor from '../interactors/deleteSubjectInteractor';
// import getSubjectInteractor from '../interactors/getSubjectInteractor';
// import listSubjectsInteractor from '../interactors/listSubjectsInteractor';
// import updateSubjectInteractor from '../interactors/updateSubjectInteractor';
// import { SubjectEntity } from '../model/SubjectEntity';
// import { updateSubjectEntity } from '../model/updateSubjectEntity';
// import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';

// const repo = new SubjectRepositoryPrisma();
// let enrollmentRepo = new EnrollmentRepositoryPrisma();
// let userRepo = new UserRepositoryPrisma();
// let testSubject: SubjectEntity = {
// 	id: '',
// 	title: 'test test test',
// 	description: '',
// 	ectsBod: '123',
// 	contentId: [],
// 	status: 'ACTIVE',
// 	semester: 'SUMMER',
// };
// let newSubject: SubjectEntity;
// let subjectId: string;
// let userId: string;

// //
// //
// //
// //
// // kreacija User-a potrebnog za Subject CRUD

// test('User create', async () => {
// 	let newUser = await createUserInteractor(userRepo, {
// 		id: '',
// 		password: '123456789',
// 		firstname: 'test',
// 		lastname: 'testic',
// 		email: '1234@fer.hr',
// 		userRole: 'DEFAULT',
// 		jmbag: '1234567891',
// 		mentorID: null,
// 	});
// 	userId = newUser.id;
// 	expect(newUser).not.toBeNull();
// });

// //
// //
// //
// //

// test('Subject create', async () => {
// 	newSubject = await createSubjectInteractor(repo, testSubject);
// 	expect(newSubject).not.toBeNull();
// });

// test('Subject update', async () => {
// 	subjectId = newSubject.id;
// 	let updateSubject: updateSubjectEntity = {
// 		id: subjectId,
// 		title: 'updated',
// 	};
// 	newSubject = await updateSubjectInteractor(
// 		userId,
// 		'SUPERADMIN',
// 		enrollmentRepo,
// 		repo,
// 		updateSubject
// 	);
// 	expect(newSubject).not.toBeNull();
// });
// test('Subject get', async () => {
// 	let newSubject: SubjectEntity | null = await getSubjectInteractor(
// 		repo,
// 		subjectId
// 	);
// 	expect(newSubject).not.toBeNull();
// });

// test('Subject list', async () => {
// 	let izlaz: SubjectEntity[] = await listSubjectsInteractor(repo);
// 	expect(izlaz).not.toBeNull();
// });

// //
// //
// //
// // brisanje
// test('Subject delete', async () => {
// 	let newSubject: SubjectEntity = await deleteSubjectInteractor(
// 		subjectId,
// 		repo
// 	);
// 	expect(newSubject).not.toBeNull();
// });
// test('User delete', async () => {
// 	let newUser: UserEntity = await deleteUserInteractor(userId, userRepo);
// 	expect(newUser).not.toBeNull();
// });
