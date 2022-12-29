import { EnrollmentRepository } from "../repository/EnrollmentRepository";

export default async function getEnrollmentByUserIdInteractor(
    enrollmentRepository: EnrollmentRepository,
    userId: string
) { 
    let response = await enrollmentRepository.getByUserId(userId);
    return response;
}