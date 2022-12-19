import { Button } from '../../../old/Button';

function Header(props) {
	return (
		<>
			<div className="w-full bg-light-accent-weak px-4 py-2 flex place-content-between place-items-center">
				Studius Header
				<Button> Log Out </Button>
			</div>
		</>
	);
}

export default Header;
