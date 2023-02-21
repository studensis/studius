'use client';

import { Button } from '../../../../components/@studius/Button/Button';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { trpc } from '../../../../components/hooks/TrpcProvider';
import { CreateRoomModal } from './CreateRoomModal';

export default function AdminToolbar() {
	const me = trpc.auth.me.useQuery();
	const { setModal } = useDialog();

	if (me.data && (me.data.role == 'ADMIN' || me.data.role == 'SUPERADMIN')) {
		return (
			<Button
				rightIcon="add"
				onClick={() => {
					setModal(<CreateRoomModal />);
				}}
			>
				Create room
			</Button>
		);
	} else {
		return null;
	}
}
