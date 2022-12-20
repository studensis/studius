export const testBackend = async () => {
	let res = await fetch('https://studius-backend-production.up.railway.app/');
	let data = await res.text();

	if (data === 'Hello World!') {
		return true;
	} else {
		return false;
	}
};
// const fetchTodos = async () => {
// 	const res = await fetch('https://jsonplaceholder.typicode.com/todos/', {
// 		next: { revalidate: 60 },
// 	});
// 	const subjects: Todo[] = await res.json();
// 	return subjects;
// };

type User = {
	id: string;
	password: string;
	firstname: string;
	lastname: string;
	jmbag: string;
	email: string;
	userRole: string;
	mentorID: any;
};

export const getUsers = async () => {
	let res = await fetch(
		'https://studius-backend-production.up.railway.app/users'
	);
	let data = await res.json();

	const users: User[] = data.map((d) => ({
		id: d.id,
		password: d.password,
		firstname: d.firstname,
		lastname: d.lastname,
		jmbag: d.jmbag,
		email: d.email,
		userRole: d.userRole,
		mentorID: d.mentorID,
	}));
	return users;
};

// const fetchSubject = async (userId: string) => {
// 	const res = await fetch(
// 		'https://jsonplaceholder.typicode.com/todos/' + userId
// 	);
// 	const user: Todo = await res.json();
// 	return user;
// };
export const getUser = async (id: string) => {
	let res = await fetch(
		'https://studius-backend-production.up.railway.app/users/' + id
	);
	let data = await res.json();

	const user: User = {
		id: data.id,
		password: data.password,
		firstname: data.firstname,
		lastname: data.lastname,
		jmbag: data.jmbag,
		email: data.email,
		userRole: data.userRole,
		mentorID: data.mentorID,
	};
	return user;
};
