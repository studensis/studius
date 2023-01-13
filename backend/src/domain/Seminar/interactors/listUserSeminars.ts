import { SeminarRepository } from '../repository/SeminarRepository';

export default async function listUserSeminars(
	seminarRepository: SeminarRepository,
	input: {
		id: string;
		options: { isMentor: boolean; isStudent: boolean };
	}
) {
	if (input.options.isMentor) {
		let seminars = await (
			await seminarRepository.getAll()
		).filter((seminar) => seminar.mentorId == input.id);
		return seminars;
	}
	if (input.options.isStudent) {
		let seminars = await (
			await seminarRepository.getAll()
		).filter((seminar) => seminar.userId == input.id);
		return seminars;
	}

	// let seminars = await seminarRepository.getById(input.id);
	// return seminars;
}
