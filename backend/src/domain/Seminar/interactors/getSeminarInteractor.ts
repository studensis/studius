import { SeminarRepository } from '../repository/SeminarRepository';

export default async function getSeminarInteractor(
    seminarRepository: SeminarRepository,
    id: string
) {
    let seminars = await seminarRepository.getById(id);
    return seminars
}
