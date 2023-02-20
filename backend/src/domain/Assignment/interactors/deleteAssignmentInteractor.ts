import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function deleteAssignmentInteractor(
	id: string,
	assignmentRepository: AssignmentRepository
) {
	let response = await assignmentRepository.delete(id);
	return response;
}
