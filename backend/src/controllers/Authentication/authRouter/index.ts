import { t } from '../../trpc';
import loginRoutine from './loginRoutine';
import logoutRoutine from './logoutRoutine';
import meRoutine from './meRoutine';

export default t.router({
	logIn: loginRoutine,
	logOut: logoutRoutine,
	me: meRoutine,
});
