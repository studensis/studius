import { LinkedEntity, Post, User } from '@prisma/client';

export default class PostEntity {
	id: string;
	title: string;
	date: Date;			// Date
    ownerId: string;			// User
    linkedEntity: LinkedEntity;			// LinkedEntity
    linkedEntityId: string;	
	contentId: string;		// Number ???


	constructor(props: Post) {
		this.id = props.id;
		this.title = props.title;
        this.ownerId = props.ownerId;
        this.linkedEntity = props.linkedEntity;
        this.linkedEntityId = props.linkedEntityId;
		this.contentId = props.contentId;
		this.date = props.Date;
	}
}