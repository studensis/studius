import { z } from 'zod';
import { t } from '../../../controllers/trpc';
import { paginationObj } from '../../pagination/paginationObj';
import approveAssignmentInteractor from '../interactors/approveAssignmentInteractor';
import approveSeminarInteractor from '../interactors/approveSeminarInteractor';
import createAssignmentInteractor from '../interactors/createAssignmentInteractor';
import deleteAssignmentInteractor from '../interactors/deleteAssignmentInteractor';
import getAssignmentInteractor from '../interactors/getAssignmentInteractor';
import listAssignmentsInteractor from '../interactors/listAssignmentsInteractor';
import listUserAssignmentsInteractor from '../interactors/listUserAssignments';
import updateAssignmentInteractor from '../interactors/updateAssignmentInteractor';
import { AssignmentEntity } from '../model/AssignmentEntity';
import { updateAssignmentEntity } from '../model/updateAssignmentEntity';
import AssignmentRepositoryPrisma from '../repository/AssignmentRepositoryPrisma';

let repo = new AssignmentRepositoryPrisma();

export default t.router({
	createAssignment: t.procedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				mentorId: z.string().optional(),
				contentId: z.string().optional(),
				subjectId: z.string().optional(),
				userId: z.string().optional(),
				type: z.enum(['SEMINAR', 'HOMEWORK', 'PRACTICAL']),
				assignmentStatus: z.enum(['DRAFT', 'READY', 'CONFIRMED']).optional(),
				status: z.enum(['ACTIVE', 'ARCHIVED']),
				deadline: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let assignment: AssignmentEntity = {
				...input,
				id: '',
				title: input.title,
				description: input.description,
				mentorId: input.mentorId,
				contentId: input.contentId,
				subjectId: input.subjectId,
				userId: input.userId,
				assignmentStatus: input.assignmentStatus,
				status: input.status,
				type: input.type,
				deadline: new Date(input.deadline),
			};

			let newAssignment = await createAssignmentInteractor(repo, assignment);
			return newAssignment;
		}),

	deleteAssignment: t.procedure
		.input(z.string())
		.mutation(async ({ input }) => {
			let response = await deleteAssignmentInteractor(input, repo);
			return response;
		}),

	updateAssignment: t.procedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().optional(),
				description: z.string(),
				mentorId: z.string().optional(),
				contentId: z.string().optional(),
				subjectId: z.string().optional(),
				userId: z.string().optional(),
				type: z.enum(['SEMINAR', 'HOMEWORK', 'PRACTICAL']),
				assignmentStatus: z.enum(['DRAFT', 'CONFIRMED', 'READY']).optional(),
				status: z.enum(['ACTIVE', 'ARCHIVED']),
				deadline: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let updatedAssignment: updateAssignmentEntity = {
				...input,
				id: input.id,
				title: input.title,
				description: input.description,
				mentorId: input.mentorId,
				contentId: input.contentId,
				subjectId: input.subjectId,
				userId: input.userId,
				status: input.status,
				deadline: new Date(input.deadline),
			};
			let response = await updateAssignmentInteractor(repo, updatedAssignment);
			return response;
		}),

	getAssignmentById: t.procedure.input(z.string()).query(async ({ input }) => {
		let response = await getAssignmentInteractor(repo, input);
		return response;
	}),

	listUserAssignments: t.procedure
		.input(
			paginationObj.merge(
				z.object({
					id: z.string(),
					options: z.object({ isStudent: z.boolean(), isMentor: z.boolean() }),
				})
			)
		)
		.query(async ({ input }) => {
			let response = await listUserAssignmentsInteractor(repo, input);
			return response;
		}),

	listAssignments: t.procedure.query(async () => {
		let response = await listAssignmentsInteractor(repo);
		return response;
	}),

	approveSeminar: t.procedure
		.input(
			z.object({
				assignmentId: z.string(),
				dateStart: z.string(),
				dateEnd: z.string(),
				roomId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let a = {
				...input,
				dateStart: new Date(input.dateStart),
				dateEnd: new Date(input.dateEnd),
			};
			let rez = await approveSeminarInteractor(repo, a);
			return rez;
		}),

	approveAssignment: t.procedure
		.input(z.string())
		.mutation(async ({ input }) => {
			let rez = await approveAssignmentInteractor(repo, input);
			return rez;
		}),
});
