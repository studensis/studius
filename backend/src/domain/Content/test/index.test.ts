import createContentInteractor from '../interactors/createContentInteractor';
import deleteContentInteractor from '../interactors/deleteContentInteractor';
import getContentInteractor from '../interactors/getContentInteractor';
import listContentsInteractor from '../interactors/listContentsInteractor';
import updateContentInteractor from '../interactors/updateContentInteractor';
import { ContentEntity } from '../model/ContentEntity';
import { updateContentEntity } from '../model/updateContentEntity';
import ContentRepositoryPrisma from '../repository/ContentRepositoryPrisma';

const repo = new ContentRepositoryPrisma();
let testContent: ContentEntity = {
	id: '',
	markdownText: 'markdownText',
	plainText: 'plainText',
	date: new Date(Date.parse('04 Dec 1995 00:12:00 GMT')),
	linkedEntity: 'SEMINAR',
	linkedEntityId: '123',
};
let newContent: ContentEntity;
let id: string;

test('Content create', async () => {
	newContent = await createContentInteractor(repo, testContent);
	expect(newContent).not.toBeNull();
});

test('Content update', async () => {
	id = newContent.id;
	let updateContent: updateContentEntity = {
		id: id,
		markdownText: 'updated',
	};
	newContent = await updateContentInteractor(repo, updateContent);
	expect(newContent).not.toBeNull();
});
test('Content get', async () => {
	let newContent: ContentEntity = await getContentInteractor(repo, id);
	expect(newContent).not.toBeNull();
});

test('Content list', async () => {
	let izlaz: ContentEntity[] = await listContentsInteractor(repo);
	expect(izlaz).not.toBeNull();
});

test('Content delete', async () => {
	let newContent: ContentEntity = await deleteContentInteractor(id, repo);
	expect(newContent).not.toBeNull();
});
