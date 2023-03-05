import { paginationType } from '../../pagination/paginationObj';
import { AssignmentRepository } from '../repository/AssignmentRepository';

export default async function listPaginatedAssignmentsInteractor(
	assignmentRepository: AssignmentRepository,
	paginationInfo: paginationType
) {
	let response = await assignmentRepository.listPaginated(paginationInfo);
	return response;
}
