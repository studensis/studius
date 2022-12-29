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

	async update(postData: PostEntity) {

		let updatedPost: any = {};

			if(postData.title) updatedPost["title"] = postData.title;
			if(postData.ownerId) updatedPost["ownerId"] = postData.ownerId;
			if(postData.linkedEntity) updatedPost["linkedEntity"] = postData.linkedEntity;
			if(postData.linkedEntityId) updatedPost["linkedEntityId"] = postData.linkedEntityId;
			if(postData.contentId) updatedPost["contentId"] = postData.contentId;
			if(postData.date) updatedPost["date"] = postData.date;

			
		let updatedData = await prisma.post.update({
			
			where: {
				id: postData.id,
			},
			data: {
				title: updatedPost.title,
			    ownerId: updatedPost.ownerId,
			    linkedEntity: updatedPost.linkedEntity,
			    linkedEntityId: updatedPost.linkedEntityId,
				contentId: updatedPost.contentId,
				date: updatedPost.date,
			},
		});		
		let rez = new PostEntity(updatedData);

		return rez;
		
	}

	async create(post: PostEntity) {
		let response = await prisma.post.create({
			data: {
				id: post.id,
			    title: post.title,
			    ownerId: post.ownerId,
			    linkedEntity: post.linkedEntity,
			    linkedEntityId: post.linkedEntityId,
				contentId: post.contentId,
				date: post.date,
			}
		});

		console.log(response);

		let out = new PostEntity(response);
		return out;
	}

	async delete(postId: string) {
		let response = await prisma.post.delete({
			where: {
				id: postId
			}
		});

		return response;
	}
}