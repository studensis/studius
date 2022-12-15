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
				id: undefined,
			    title: "tajtl",
			    date: "osmi osmi",         //Date
			    ownerId: "ja",             //User
			    linkedEntity: LinkedEntity.POST,
			    linkedEntityId: "linkt entiti ajdi",
				contentId: "kontent ajdi",
			}
		});

		console.log(response);

		let out = new PostEntity(response);
		return out;
	}
}