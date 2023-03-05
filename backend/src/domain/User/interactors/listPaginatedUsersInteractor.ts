import { paginationType } from '../../pagination/paginationObj';
import { UserRepository } from '../repository/UserRepository';

export default async function listUsersInteractor(
	userRepository: UserRepository,
	paginationInfo: paginationType
) {
	let users = await userRepository.listPaginated(paginationInfo);
	return users;
}
