import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import updateSeminarSuggestionInteractor from '../interactors/updateSeminarSuggestionInteractor';
import SeminarSuggestionEntity from '../model/SeminarSuggestionEntity';
import SeminarSuggestionRepositoryPrisma from '../repository/SeminarSuggestionRepositoryPrisma';

export default async function updateSeminarSuggestionRouteHandler(
	req: Request,
	res: Response
) {
	console.log(`seminarSuggestions/${req.params.seminarSuggestionId} PUT`);

	try {
		let seminarSuggestionData = new SeminarSuggestionEntity({
			id: req.params.seminarSuggestionId as string,
			seminarId: req.query.seminarId as string,
			subjectId: req.query.subjectId as string,
		});
		let repo = new SeminarSuggestionRepositoryPrisma();
		let updatedSeminarSuggestion = await updateSeminarSuggestionInteractor(
			repo,
			seminarSuggestionData
		);
		return res.send(updatedSeminarSuggestion);
	} catch (err) {
		console.log(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}
