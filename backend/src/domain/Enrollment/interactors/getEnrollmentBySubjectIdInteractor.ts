import { EnrollmentRepository } from "../repository/EnrollmentRepository";

export default async function getEnrollmentBySubjectIdInteractor(
    enrollmentRepository: EnrollmentRepository,
    subjectId: string
) { 
    let response = await enrollmentRepository.getBySubjectId(subjectId);
    return response;
}