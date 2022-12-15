import { Post, User } from '@prisma/client';

export default class PostEntity {
	id: string;
	title: string;
	date: Date;			// Date
    ownerId: string;			// User
    linkedEntity: string;			// LinkedEntity
    linkedEntityId: string;			// Number ???


	constructor(props: Post) {
		this.id = props.id;
		this.title = props.title;
		this.date = props.date;
        this.ownerId = props.ownerId;
        this.linkedEntity = props.linkedEntity;
        this.linkedEntityId = props.linkedEntityId;

	}
}