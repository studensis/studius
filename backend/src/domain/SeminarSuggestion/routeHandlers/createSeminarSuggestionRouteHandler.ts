import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createSeminarSuggestionInteractor from '../interactors/createSeminarSuggestionInteractor';
import { SeminarSuggestionEntity } from '../model/SeminarSuggestionEntity';
import SeminarSuggestionRepositoryPrisma from '../repository/SeminarSuggestionRepositoryPrisma';

export default async function createSeminarSuggestionRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/seminarSuggestions POST');

	try {
		let newSeminarSuggestion: SeminarSuggestionEntity = {
			id: req.query.id as string,
			seminarId: req.query.seminarId as string,
			subjectId: req.query.subjectId as string,
		};
		//newSeminarSuggestion.validate();
		let repo = new SeminarSuggestionRepositoryPrisma();
		let seminarSuggestion = await createSeminarSuggestionInteractor(
			repo,
			newSeminarSuggestion
		);
		return res.send(seminarSuggestion);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
