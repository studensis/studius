import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getSeminarSuggestionInteractor from '../interactors/getSeminarSuggestionInteractor';
import SeminarSuggestionRepositoryPrisma from '../repository/SeminarSuggestionRepositoryPrisma';

export default async function getSeminarSuggestionRouteHandler(req: Request, res: Response) {
    console.log(`seminarSuggestions/${req.params.seminarSuggestionId} GET`);

	try {
		let id = String(req.params.seminarSuggestionId);
		let repo = new SeminarSuggestionRepositoryPrisma();
		let seminarSuggestion = await getSeminarSuggestionInteractor(repo, id);
		return res.send(seminarSuggestion);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
	}
}
