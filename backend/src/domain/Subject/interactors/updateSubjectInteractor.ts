import { SubjectRepository } from '../repository/SubjectRepository';
import { updateSubjectEntity } from '../updateSubjectEntity';

export default async function updateSubjectInteractor(
    subjectRepository: SubjectRepository,
    subject: updateSubjectEntity
) {
    let updatedSubject = await subjectRepository.update(subject);
    return updatedSubject;
}
