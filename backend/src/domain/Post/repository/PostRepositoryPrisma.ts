import { PrismaClient } from '@prisma/client';
import { paginationType } from '../../pagination/paginationObj';
import { PostEntity } from '../model/PostEntity';
import { updatePostEntity } from '../model/updatePostEntity';
import { PostRepository } from './PostRepository';

const prisma = new PrismaClient();

export default class PostRepositoryPrisma extends PostRepository {
	async getAll() {
		// prisma Posts
		let datas = await prisma.post.findMany();

		// map to PostEntities
		let posts: PostEntity[] = [];
		datas.forEach((data: PostEntity) => {
			let post: PostEntity = data;
			posts.push(post);
		});

		return posts;
	}
	async listPaginated(paginationInfo: paginationType) {
		// prisma Posts
		let datas = await prisma.post.findMany({
			skip: paginationInfo.objectsPerPage * paginationInfo.pageNumber,
			take: paginationInfo.objectsPerPage,
		});

		// map to PostEntities
		let posts: PostEntity[] = [];
		datas.forEach((data: PostEntity) => {
			let post: PostEntity = data;
			posts.push(post);
		});

		return posts;
	}

	async getById(id: string) {
		let data = await prisma.post.findUnique({ where: { id: id } });
		if (data) {
			let post: PostEntity = data;
			return post;
		} else {
			throw new Error('no data');
		}
	}

	async update(postData: updatePostEntity) {
		let updatedData = await prisma.post.update({
			where: {
				id: postData.id,
			},
			data: {
				title: postData.title ? postData.title : undefined,
				ownerId: postData.ownerId ? postData.ownerId : undefined,
				linkedEntity: postData.linkedEntity ? postData.linkedEntity : undefined,
				linkedEntityId: postData.linkedEntityId
					? postData.linkedEntityId
					: undefined,
				contentId: postData.contentId ? postData.contentId : undefined,
				date: postData.date ? postData.date : undefined,
			},
		});
		let rez: PostEntity = updatedData;

		return rez;
	}

	async create(post: PostEntity) {
		let response = await prisma.post.create({
			data: {
				title: post.title,
				ownerId: post.ownerId,
				linkedEntity: post.linkedEntity,
				linkedEntityId: post.linkedEntityId,
				contentId: post.contentId,
				date: post.date,
			},
		});

		console.log(response);

		let out: PostEntity = response;
		return out;
	}

	async delete(postId: string) {
		let response = await prisma.post.delete({
			where: {
				id: postId,
			},
		});

		return response;
	}
}
