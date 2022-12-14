import { Post, User } from '@prisma/client';

export default class PostEntity {
	id: number;
	title: string;
	date: Date;
    owner: User;
    LinkedEntity: string;
    LinketEntityId: string;


	constructor(props: Post) {
		this.id = props.id;
		this.title = props.title;
		this.date = props.date;
        this.owner = props.owner;
        this.LinkedEntity = props.LinkedEntity;
        this.LinketEntityId = props.LinketEntityId;
	}
}