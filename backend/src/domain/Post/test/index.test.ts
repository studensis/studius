import createPostInteractor from '../interactors/createPostInteractor';
import deletePostInteractor from '../interactors/deletePostInteractor';
import getPostInteractor from '../interactors/getPostInteractor';
import listPostsInteractor from '../interactors/listPostsInteractor';
import updatePostInteractor from '../interactors/updatePostInteractor';
import { PostEntity } from '../model/PostEntity';
import { updatePostEntity } from '../model/updatePostEntity';
import PostRepositoryPrisma from '../repository/PostRepositoryPrisma';

const repo = new PostRepositoryPrisma();
let testPost: PostEntity = {
	id: '',
	title: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	linkedEntity: 'SEMINAR',
	linkedEntityId: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	ownerId: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	contentId: Buffer.from(Math.random().toString())
		.toString('base64')
		.substring(5, 15),
	date: null,
};
let newPost: PostEntity;
let id: string;

test('Post create', async () => {
	newPost = await createPostInteractor(repo, testPost);
	expect(newPost).not.toBeNull();
});

test('Post update', async () => {
	id = newPost.id;
	let updatePost: updatePostEntity = {
		id: id,
		title: 'updated',
	};
	newPost = await updatePostInteractor(repo, updatePost);
	expect(newPost).not.toBeNull();
});
test('Post get', async () => {
	let newPost: PostEntity = await getPostInteractor(repo, id);
	expect(newPost).not.toBeNull();
});

test('Post list', async () => {
	let izlaz: PostEntity[] = await listPostsInteractor(repo);
	expect(izlaz).not.toBeNull();
});

test('Post delete', async () => {
	let newPost: PostEntity = await deletePostInteractor(id, repo);
	expect(newPost).not.toBeNull();
});
