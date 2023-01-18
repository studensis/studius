import createSeminarInteractor from '../interactors/createSeminarInteractor';
import deleteSeminarInteractor from '../interactors/deleteSeminarInteractor';
import getSeminarInteractor from '../interactors/getSeminarInteractor';
import listSeminarsInteractor from '../interactors/listSeminarsInteractor';
import updateSeminarInteractor from '../interactors/updateSeminarInteractor';
import { SeminarEntity } from '../model/SeminarEntity';
import { updateSeminarEntity } from '../model/updateSeminarEntity';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';

const repo = new SeminarRepositoryPrisma();
let testSeminar: SeminarEntity = {
	id: '',
	title: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	description: '',
	status: 'DRAFT',
};
let newSeminar: SeminarEntity;
let id: string;

test('Seminar create', async () => {
	newSeminar = await createSeminarInteractor(repo, testSeminar);
	expect(newSeminar).not.toBeNull();
});

test('Seminar update', async () => {
	id = newSeminar.id;
	let updateSeminar: updateSeminarEntity = {
		id: id,
		title: 'updated',
	};
	newSeminar = await updateSeminarInteractor(repo, updateSeminar);
	expect(newSeminar).not.toBeNull();
});
test('Seminar get', async () => {
	let newSeminar: SeminarEntity = await getSeminarInteractor(repo, id);
	expect(newSeminar).not.toBeNull();
});

test('Seminar list', async () => {
	let izlaz: SeminarEntity[] = await listSeminarsInteractor(repo);
	expect(izlaz).not.toBeNull();
});

test('Seminar delete', async () => {
	let newSeminar: SeminarEntity = await deleteSeminarInteractor(id, repo);
	expect(newSeminar).not.toBeNull();
});
