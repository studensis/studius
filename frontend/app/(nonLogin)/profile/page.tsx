'use client';
import Protected from '../../../components/@studius/Protected/Protected';
import ProfilePage from './ProfilePage';

const page = () => {
	return (
		<div>
			<Protected minRole="DEFAULT" displayMessage>
				<ProfilePage />
			</Protected>
		</div>
	);
};

export default page;
