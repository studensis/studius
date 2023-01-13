import { EventUserPresenceRepository } from '../../EventUserPresence/repository/EventUserPresenceRepository';

export default async function deleteEventUserPresenceByRTEIDInteractor(
	RTEID: string,
	eventUserPresenceRepository: EventUserPresenceRepository
) {
	let response = await eventUserPresenceRepository.deleteByRTEID(RTEID);
	return response;
}
