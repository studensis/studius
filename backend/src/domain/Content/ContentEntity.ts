import { Content } from '@prisma/client';

export default class ContentEntity {
	id: number;
	Markdown_Text: string;
    plain_text: string;
    date: Date;

	constructor(props: Content) {
		this.id = props.id;
        this.Markdown_Text = props.Markdown_Text;
        this.plain_text = props.plain_text;
        this.date = props.date;
	}

	
}
