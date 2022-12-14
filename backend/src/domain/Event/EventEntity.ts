import { Event } from '@prisma/client';

export default class EventEntity {
	id: number;
	title: string;
	description: string;
	LinkedEntity: LinkedEntity;
    LinkedEntityId: string;

	constructor(props: Subject) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.LinkedEntity = props.LinkedEntity;
        this.LinketEntityId = props.LinketEntityId;
	}
}