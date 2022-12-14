import { UserRepository } from '../../User/repository/UserRepository';
import { SeminarRepository } from '../repository/SeminarRepository';

export default async function listUsersInteractor(
    seminarRepository: SeminarRepository
) {
    let seminars = await seminarRepository.getAll();
    return seminars
}