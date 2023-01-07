import { LinkedEntity, Post } from '@prisma/client';

export default class PostEntity {
	id: string;
	title: string;
	date: Date | null; // Date
	ownerId: string;
	linkedEntity: LinkedEntity; // LinkedEntity
	linkedEntityId: string;
	contentId: string;

	constructor(props: Post) {
		this.id = props.id;
		this.title = props.title;
		this.ownerId = props.ownerId;
		this.linkedEntity = props.linkedEntity;
		this.linkedEntityId = props.linkedEntityId;
		this.contentId = props.contentId;
		this.date = props.date;
	}
}
