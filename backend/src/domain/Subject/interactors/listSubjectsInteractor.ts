import { paginationType } from '../../pagination/paginationObj';
import { SubjectRepository } from '../repository/SubjectRepository';

export default async function listSubjectsInteractor(
	subjectRepository: SubjectRepository,
	paginationInfo: paginationType
) {
	let subjects = await subjectRepository.getAll(paginationInfo);
	return subjects;
}
