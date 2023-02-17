import { TRPCError } from '@trpc/server';
import { AssignmentEntity } from '../model/AssignmentEntity';
import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function createAssignmentInteractor(
	assignmentRepository: AssignmentRepository,
	assignment: AssignmentEntity
) {
	if (!assignment.title || !assignment.description || assignment.mentorId) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'Nepotpuni podaci',
		});
	}
	let assignments = await assignmentRepository.create(assignment);
	return assignments;
}
