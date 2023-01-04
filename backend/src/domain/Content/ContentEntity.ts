import { Content, LinkedEntity } from '@prisma/client';

export default class ContentEntity {
	id: string;
	markdownText: string;
	plainText: string;
	date: Date | null; // Date
	linkedEntity: LinkedEntity;
	linkedEntityId: string;

	constructor(props: Content) {
		this.id = props.id;
		this.markdownText = props.markdownText;
		this.plainText = props.plainText;
		this.date = props.date;
		this.linkedEntity = props.linkedEntity;
		this.linkedEntityId = props.linkedEntityId;
	}
}
