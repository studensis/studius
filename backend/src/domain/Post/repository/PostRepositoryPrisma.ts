import { PrismaClient } from '@prisma/client';
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

	async getById(id: number) {
		let data = await prisma.post.findUnique({ where: { id: id } });
		let post = new PostEntity(data);
		return post;
	}

	async create(post: PostEntity) {
		let response = await prisma.post.create({
			data: {
				id: undefined,
			    title: "tajtl",
			    date: "osmi osmi",         //Date
			    owner: "ja",               //User
			    LinkedEntity: "linkt entiti",
			    LinkedEntityId: "linkt entiti ajdi",
			}
		});

		console.log(response);

		let out = new PostEntity(response);
		return out;
	}
}