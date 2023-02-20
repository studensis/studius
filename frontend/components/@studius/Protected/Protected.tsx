import useLogin from '../../hooks/LoginContext';
import { Spinner } from '../Spinner/Spinner';
import AccessDenied from './AccessDenied';

enum roleEnum {
	UNDEFINED,
	DEFAULT,
	ADMIN,
	SUPERADMIN,
}

enum subjectRoleEnum {
	STUDENT,
	DEMONSTRATOR,
	ASSISSTANT,
	PROFESSOR,
	OWNER,
	UNDEFINED,
}

type props =
	| {
			displayMessage?: boolean;
			minRole: string;
			minSubjectRole?: undefined;
			subjectId?: string;
			children: React.ReactNode;
	  }
	| {
			displayMessage?: boolean;
			minRole?: undefined;
			minSubjectRole:
				| 'STUDENT'
				| 'OWNER'
				| 'PROFESSOR'
				| 'DEMONSTRATOR'
				| 'ASSISTANT';
			subjectId?: string;
			children: React.ReactNode;
	  };

const Protected = ({
	minRole,
	minSubjectRole,
	children,
	displayMessage,
	subjectId,
}: props) => {
	const { user, loggedIn, enrollments } = useLogin();
	const subject = enrollments
		.filter((e) => e.subjectId === subjectId)
		.reverse()[0];
	const subjectRoleTitle = subject?.roleTitle;

	//Usporedba inputane globalne role s userovom (iz sessiona)
	let userRole: roleEnum = roleEnum.UNDEFINED;
	if (user?.role === 'DEFAULT') userRole = roleEnum.DEFAULT;
	if (user?.role === 'ADMIN') userRole = roleEnum.ADMIN;
	if (user?.role === 'SUPERADMIN') userRole = roleEnum.SUPERADMIN;

	let inputRole: roleEnum = roleEnum.UNDEFINED;
	if (minRole === 'DEFAULT') inputRole = roleEnum.DEFAULT;
	if (minRole === 'ADMIN') inputRole = roleEnum.ADMIN;
	if (minRole === 'SUPERADMIN') inputRole = roleEnum.SUPERADMIN;

	//Usporedba role na subjectu
	let userSubjectRole: subjectRoleEnum = subjectRoleEnum.UNDEFINED;
	if (subjectRoleTitle == 'ASSISTANT')
		userSubjectRole = subjectRoleEnum.ASSISSTANT;
	if (subjectRoleTitle == 'DEMONSTRATOR')
		userSubjectRole = subjectRoleEnum.DEMONSTRATOR;
	if (subjectRoleTitle == 'OWNER') userSubjectRole = subjectRoleEnum.OWNER;
	if (subjectRoleTitle == 'PROFESSOR')
		userSubjectRole = subjectRoleEnum.PROFESSOR;
	if (subjectRoleTitle == 'STUDENT') userSubjectRole = subjectRoleEnum.STUDENT;

	let inputSubjectRole: subjectRoleEnum = subjectRoleEnum.UNDEFINED;
	if (minSubjectRole == 'ASSISTANT')
		inputSubjectRole = subjectRoleEnum.ASSISSTANT;
	if (minSubjectRole == 'DEMONSTRATOR')
		inputSubjectRole = subjectRoleEnum.DEMONSTRATOR;
	if (minSubjectRole == 'OWNER') inputSubjectRole = subjectRoleEnum.OWNER;
	if (minSubjectRole == 'PROFESSOR')
		inputSubjectRole = subjectRoleEnum.PROFESSOR;
	if (minSubjectRole == 'STUDENT') userSubjectRole = subjectRoleEnum.STUDENT;

	return (
		<>
			{/* Ako se gleda globalna rola */}
			{minRole ? (
				<>
					{loggedIn ? (
						<>
							{userRole !== roleEnum.UNDEFINED ? (
								<>
									{userRole > inputRole ? (
										<>{children}</>
									) : (
										<>
											<AccessDenied />
										</>
									)}
								</>
							) : (
								<>
									<Spinner />
								</>
							)}
						</>
					) : (
						<>{displayMessage ? <AccessDenied /> : <></>}</>
					)}
				</>
			) : /* Ako se gleda rola na predmetu */
			minSubjectRole ? (
				<>
					{loggedIn ? (
						userSubjectRole >= inputSubjectRole ? (
							<>{children}</>
						) : (
							<></>
						)
					) : (
						<></>
					)}
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default Protected;
