import { Post, User } from '@prisma/client';

export default class PostEntity {
	id: number;
	title: string;
	date: string;			// Date
    owner: string;			// User
    LinkedEntity: string;			// LinkedEntity
    LinketEntityId: string;			// Number ???


	constructor(props: Post) {
		this.id = props.id;
		this.title = props.title;
		this.date = props.date;
        this.owner = props.owner;
        this.LinkedEntity = props.LinkedEntity;
        this.LinketEntityId = props.LinketEntityId;
	}
}