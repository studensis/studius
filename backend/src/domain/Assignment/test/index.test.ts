import createAssignmentInteractor from '../interactors/createAssignmentInteractor';
import deleteAssignmentInteractor from '../interactors/deleteAssignmentInteractor';
import getAssignmentInteractor from '../interactors/getAssignmentInteractor';
import listAssignmentsInteractor from '../interactors/listAssignmentsInteractor';
import updateAssignmentInteractor from '../interactors/updateAssignmentInteractor';
import { AssignmentEntity } from '../model/AssignmentEntity';
import { updateAssignmentEntity } from '../model/updateAssignmentEntity';
import AssignmentRepositoryPrisma from '../repository/AssignmentRepositoryPrisma';

const repo = new AssignmentRepositoryPrisma();
let testAssignment: AssignmentEntity = {
	id: '',
	title: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	description: '',
	status: 'DRAFT',
};
let newAssignment: AssignmentEntity;
let id: string;

test('Assignment create', async () => {
	newAssignment = await createAssignmentInteractor(repo, testAssignment);
	expect(newAssignment).not.toBeNull();
});

test('Assignment update', async () => {
	id = newAssignment.id;
	let updateAssignment: updateAssignmentEntity = {
		id: id,
		title: 'updated',
	};
	newAssignment = await updateAssignmentInteractor(repo, updateAssignment);
	expect(newAssignment).not.toBeNull();
});
test('Assignment get', async () => {
	let newAssignment: AssignmentEntity = await getAssignmentInteractor(repo, id);
	expect(newAssignment).not.toBeNull();
});

test('Assignment list', async () => {
	let izlaz: AssignmentEntity[] = await listAssignmentsInteractor(repo);
	expect(izlaz).not.toBeNull();
});

test('Assignment delete', async () => {
	let newAssignment: AssignmentEntity = await deleteAssignmentInteractor(
		id,
		repo
	);
	expect(newAssignment).not.toBeNull();
});
