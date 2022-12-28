import { SubjectRepository } from '../repository/SubjectRepository';
import SubjectEntity from '../SubjectEntity';

export default async function updateSubjectInteractor(
    subjectRepository: SubjectRepository,
    id: string,
    contentId: string[]
) {
    let updatedSubject = await subjectRepository.addContent(id, contentId);
    return updatedSubject;
}
