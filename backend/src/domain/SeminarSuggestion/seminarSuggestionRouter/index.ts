import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createSeminarSuggestionInteractor from '../interactors/createSeminarSuggestionInteractor';
import deleteSeminarSuggestionInteractor from '../interactors/deleteSeminarSuggestionInteractor';
import getSeminarSuggestionInteractor from '../interactors/getSeminarSuggestionInteractor';
import listSeminarSuggestionsInteractor from '../interactors/listSeminarSuggestionsInteractor';
import updateSeminarSuggestionInteractor from '../interactors/updateSeminarSuggestionInteractor';
import { SeminarSuggestionEntity } from '../model/SeminarSuggestionEntity';
import SeminarSuggestionRepositoryPrisma from '../repository/SeminarSuggestionRepositoryPrisma';

let repo = new SeminarSuggestionRepositoryPrisma();

export default t.router({
	createSeminarSuggestion: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				seminarId: z.string(),
				subjectId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let seminarSuggestion: SeminarSuggestionEntity = {
				...input,
				id: '',
			};
			let newSeminarSuggestion = await createSeminarSuggestionInteractor(
				repo,
				seminarSuggestion
			);
			return newSeminarSuggestion;
		}),

	deleteSeminarSuggestionById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteSeminarSuggestionInteractor(input, repo);
			return a;
		}),

	getSeminarSuggestionById: t.procedure
		.input(z.string())
		.query(async ({ input }) => {
			let seminarSuggestion = await getSeminarSuggestionInteractor(repo, input);
			return seminarSuggestion;
		}),

	listSeminarSuggestions: t.procedure.query(async () => {
		let seminarSuggestions = await listSeminarSuggestionsInteractor(repo);
		return seminarSuggestions as SeminarSuggestionEntity[];
	}),

	updateSeminarSuggestionById: t.procedure
		.input(
			z.object({
				id: z.string(),
				seminarId: z.string().optional(),
				subjectId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let seminarSuggestion = { ...input };
			let updatedSeminarSuggestion = await updateSeminarSuggestionInteractor(
				repo,
				seminarSuggestion
			);
			return updatedSeminarSuggestion;
		}),
});
