import { SeminarRepository } from '../repository/SeminarRepository';
import SeminarEntity from '../SeminarEntity';

export default async function createSeminarInteractor(
    seminarRepository: SeminarRepository,
    seminar: SeminarEntity
) {
    let seminars = await seminarRepository.create(seminar);
    return seminars;
}