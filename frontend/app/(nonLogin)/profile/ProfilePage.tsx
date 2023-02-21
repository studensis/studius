import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Button } from '../../../components/@studius/Button/Button';
import Icon from '../../../components/@studius/Icon/Icon';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Section } from '../../../components/@studius/PageElements/Section';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import useLogin from '../../../components/hooks/LoginContext';
import { trpc } from '../../../components/hooks/TrpcProvider';

type props = {};

const ProfilePage: FC<props> = ({}) => {
	const { user } = useLogin();
	const localUser = trpc.user.getUserById.useQuery(user!.userId).data;
	const updateUser = trpc.user.updateUserById.useMutation();
	const googleLink = trpc.auth.external.google.link.useMutation();
	const [box, setBox] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const router = useRouter();
	const subjects = trpc.user.getEnrolledSubjects.useQuery(user!.userId);

	function updatePP() {
		updateUser.mutate({ id: localUser!.id, avatar: imageUrl });
		router.push('/profile');
	}

	return (
		<div>
			<Section className="mb-2">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="display3">
							{localUser?.firstname + ' ' + localUser?.lastname}
						</h1>
						<p className="title1">Profile page</p>
					</div>
					<div className="">
						<img
							height="200px"
							width="200px"
							className="rounded-3xl shadow-xl"
							src={
								localUser?.avatar
									? localUser.avatar
									: 'https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg'
							}
							alt="Profile picture"
						/>
					</div>
				</div>
			</Section>

			<Section className="mb-2 flex items-start justify-center">
				<Stack cols={4}>
					<p className="title1 border-2 border-accent-medium p-2">
						{localUser?.email}
					</p>
					<p className="title1 border-2 border-accent-medium p-2">
						{localUser?.jmbag}
					</p>
					<p className="title1 border-2 border-accent-medium p-2">
						broj polozenih ects
					</p>
					<p className="title1 border-2 border-accent-medium p-2">jos nes</p>
				</Stack>
			</Section>

			<Section className="mb-2">
				<div>
					<Stack cols={5}>
						{subjects.data?.map((subject) => (
							<Link
								className="tilte1 text-center rounded-lg border-2 border-accent-medium text-black p-2 m-2 hover:bg-accent-weak"
								href={'/subject/' + subject.subject.id}
							>
								<p className="body1">{subject.subject.title}</p>
							</Link>
						))}
					</Stack>
				</div>
			</Section>

			<Section className="mb-2">
				<h1 className="title1">Change your profile picture</h1>
				<label htmlFor="url">Input image URL here</label>
				<input
					className="rounded-xl border-2 border-accent-medium outline-none p-3 my-3 w-full "
					name="url"
					type="text"
					onChange={(e) => {
						setImageUrl(e.target.value);
					}}
				/>
				<Button
					onClick={() => {
						updatePP();
					}}
					className=""
				>
					Change
				</Button>
			</Section>
			{localUser && (
				<>
					<Section>
						<Stack>
							<h3 className="title1">Link with Google Account</h3>

							{localUser!.googleUserId && (
								<Stack cols={2}>
									<Block info className="h-auto">
										<div className="flex flex-row gap-1">
											<p className="body2 text-info">
												<span>Google account is already linked</span>
											</p>
											<Icon icon="checkmark" className="bg-info" />
										</div>
									</Block>
									<Block danger className="h-auto">
										<p className="body2 text-danger">
											Warning: Linking with a new Google account will unlink it
											from the previous account!
										</p>
									</Block>
								</Stack>
							)}
							<Stack cols={2}>
								{localUser!.googleUserId && (
									<Stack>
										<Button
											className="w-max bg-danger"
											onClick={() => {
												updateUser.mutate({
													id: user!.userId,
													googleUserId: null,
												});
											}}
											loading={updateUser.isLoading}
										>
											Unlink account
										</Button>
									</Stack>
								)}
								<Stack>
									<h3 className="title3">
										{localUser!.googleUserId ? 'Relink' : 'Link'} account{' '}
									</h3>
									<GoogleLogin
										onSuccess={(response) => {
											if (response.credential) {
												googleLink.mutate({
													credential: response.credential,
													updateImage: box,
												});
											}
										}}
									/>
									<div className="flex flex-row gap-1">
										<input
											type="checkbox"
											onChange={(e) => {
												if (e.currentTarget.checked) {
													setBox(e.currentTarget.checked);
												}
											}}
										/>
										<span className="body3">Update profile picture</span>
									</div>
								</Stack>
							</Stack>
						</Stack>
					</Section>
				</>
			)}
		</div>
	);
};

export default ProfilePage;
