import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listSeminarSuggestionsInteractor from '../interactors/listSeminarSuggestionsInteractor';
import SeminarSuggestionRepositoryPrisma from '../repository/SeminarSuggestionRepositoryPrisma';

export default async function listSeminarSuggestionsRouteHandler(
	req: Request,
	res: Response
) {
	console.log('/seminarSuggestions GET');

	try {
		let repo = new SeminarSuggestionRepositoryPrisma();
		let seminarSuggestions = await listSeminarSuggestionsInteractor(repo);
		res.send(seminarSuggestions);
	} catch {
		res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
