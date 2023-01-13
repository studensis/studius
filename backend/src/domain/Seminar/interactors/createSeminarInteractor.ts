import { SeminarEntity } from '../model/SeminarEntity';
import { SeminarRepository } from '../repository/SeminarRepository';

export default async function createSeminarInteractor(
	seminarRepository: SeminarRepository,
	seminar: SeminarEntity
) {
	let seminars = await seminarRepository.create(seminar);
	return seminars;
}
