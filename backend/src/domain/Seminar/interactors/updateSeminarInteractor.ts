import { SeminarRepository } from '../repository/SeminarRepository';
import SeminarEntity from '../SeminarEntity';

export default async function updateSeminarInteractor(
    seminarRepository: SeminarRepository,
    seminar: SeminarEntity
) {
    let updatedSeminar = await seminarRepository.update(seminar);
    return updatedSeminar;
}
