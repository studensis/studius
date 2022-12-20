import { SubjectRepository } from '../repository/SubjectRepository';
import SubjectEntity from '../SubjectEntity';

export default async function updateSubjectInteractor(
    subjectRepository: SubjectRepository,
    subject: SubjectEntity
) {
    let updatedSubject = await subjectRepository.update(subject);
    return updatedSubject;
}
