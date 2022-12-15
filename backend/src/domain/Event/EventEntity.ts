import { Event } from '@prisma/client';

export default class EventEntity {
	id: string;
	title: string;
	description: string;
	linkedEntity: string;		// LinkedEntity
    linkedEntityId: string;		// Number ????

	constructor(props: Event) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.linkedEntity = props.linkedEntity;
        this.linkedEntityId = props.linkedEntityId;
	}
}