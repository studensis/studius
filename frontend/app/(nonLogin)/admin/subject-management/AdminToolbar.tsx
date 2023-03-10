'use client';

import { Button } from '../../../../components/@studius/Button/Button';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { trpc } from '../../../../components/hooks/TrpcProvider';
import { CreateSubjectModal } from './CreateSubjectModal';

export default function AdminToolbar() {
	const me = trpc.auth.me.useQuery();
	const { setModal } = useDialog();

	return (
		<>
			{me.data && (me.data.role == 'ADMIN' || me.data.role == 'SUPERADMIN') ? (
				<Button
					rightIcon="add"
					onClick={() => {
						setModal(<CreateSubjectModal />);
					}}
				>
					Create Subject
				</Button>
			) : (
				<> </>
			)}
		</>
	);
}
