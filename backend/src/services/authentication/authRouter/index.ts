import { t } from '../../../controllers/trpc';
import loginRoutine from './loginRoutine';
import logoutRoutine from './logoutRoutine';
import meRoutine from './meRoutine';

export default t.router({
	login: loginRoutine,
	logout: logoutRoutine,
	me: meRoutine,
});
