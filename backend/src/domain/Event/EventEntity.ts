import { Event } from '@prisma/client';

export default class EventEntity {
	id: number;
	title: string;
	description: string;
	LinkedEntity: string;		// LinkedEntity
    LinkedEntityId: string;		// Number ????

	constructor(props: Event) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.LinkedEntity = props.LinkedEntity;
        this.LinkedEntityId = props.LinketEntityId;
	}
}