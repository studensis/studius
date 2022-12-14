import { SeminarRepository } from '../repository/SeminarRepository';

export default async function getSeminarInteractor(
    seminarRepository: SeminarRepository,
    id: number
) {
    let seminars = await seminarRepository.getById(id);
    return seminars
}
