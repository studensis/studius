import Header from '../components/Header/Header';
import '../styles/globals.css';

export default function Custom404() {
	return (
		<>
			<Header />
			<div className="grid w-screen h-full place-items-center">
				<div className="absolute  center">
					<p className="display1 z-10">404</p>
					<p className="display3 -ml-14">Page not found</p>
				</div>
				<img
					className="h-screen w-screen -z-10 hidden md:block"
					style={{ objectFit: 'cover' }}
					src="/assets/images/background_desktop.svg"
					alt="Image not found."
				/>
				<img
					className="h-screen w-screen -z-10 block md:hidden"
					style={{ objectFit: 'cover' }}
					src="/assets/images/background_mobile.svg"
					alt="Image not found."
				/>
			</div>
		</>
	);
}
