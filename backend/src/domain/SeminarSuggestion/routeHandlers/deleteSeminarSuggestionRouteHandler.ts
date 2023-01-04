import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import deleteSeminarSuggestionInteractor from '../interactors/deleteSeminarSuggestionInteractor';
import SeminarSuggestionRepositoryPrisma from '../repository/SeminarSuggestionRepositoryPrisma';

export default async function deleteSeminarSuggestionRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`seminarSuggestions/${req.params.seminarSuggestionId} DELETE`);

	try {
		let id = req.params.seminarSuggestionId;
		let repo = new SeminarSuggestionRepositoryPrisma();
		let response = await deleteSeminarSuggestionInteractor(id, repo);
		return res.send(response);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
