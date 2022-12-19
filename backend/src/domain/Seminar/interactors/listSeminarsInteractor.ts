import { SeminarRepository } from '../repository/SeminarRepository';

export default async function listSeminarsInteractor(
    seminarRepository: SeminarRepository
) {
    let seminars = await seminarRepository.getAll();
    return seminars
}