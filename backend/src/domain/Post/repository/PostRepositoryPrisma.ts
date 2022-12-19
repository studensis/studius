import { LinkedEntity, PrismaClient } from '@prisma/client';
import UserEntity from '../../User/UserEntity';
import PostEntity from '../PostEntity';
import { PostRepository } from './PostRepository';

const prisma = new PrismaClient();

export default class PostRepositoryPrisma extends PostRepository {
	async getAll() {
		// prisma Posts
		let datas = await prisma.post.findMany();

		// map to PostEntities
		let posts: PostEntity[] = [];
		datas.forEach((data) => {
			let post = new PostEntity(data);
			posts.push(post);
		});

		return posts;
	}

	async getById(id: string) {
		let data = await prisma.post.findUnique({ where: { id: id } });
		let post = new PostEntity(data);
		return post;
	}

	async create(post: PostEntity) {
		let response = await prisma.post.create({
			data: {
			    title: post.title,
			    ownerId: post.ownerId,             //User
			    linkedEntity: post.linkedEntity,
			    linkedEntityId: post.linkedEntityId,
				contentId: post.contentId,
			}
		});

		console.log(response);

		let out = new PostEntity(response);
		return out;
	}
}