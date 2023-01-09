'use client';

import React, { createContext, useContext, useState } from 'react';
import Icon from '../Icon/Icon';

interface IModalContext {
	sidebarElement: React.ReactNode | null;
	setSidebar: (element: React.ReactNode | null) => void;
}

const ModalContext = createContext<IModalContext>({
	sidebarElement: null,
	setSidebar: (element) => {},
});

function ModalProvider({ children }: { children: React.ReactNode }) {
	const [sidebarElement, setSidebarElement] = useState<React.ReactNode | null>(
		null
	);

	return (
		<>
			<ModalContext.Provider
				value={{
					sidebarElement: sidebarElement,
					setSidebar: (element) => {
						if (element) {
							setSidebarElement(element);
						} else {
							setSidebarElement(null);
						}
					},
				}}
			>
				{children}
			</ModalContext.Provider>
		</>
	);
}

export function ModalOverlay() {
	const { sidebarElement, setSidebar } = useModal();
	return (
		<>
			{sidebarElement ? (
				<div
					className="sm:hidden absolute top-0 left-0 right-0 md:bottom-0 bg-background opacity-80 h-screen"
					onClick={() => {
						setSidebar(null);
					}}
				></div>
			) : (
				<></>
			)}
		</>
	);
}
export function ModalSidebar() {
	const { sidebarElement, setSidebar } = useModal();
	return (
		<>
			{sidebarElement ? (
				<div className="absolute right-0 sm:top-24 bottom-0 py-6 sm:px-6 w-full sm:w-[360px]">
					<div className="shadow-sm-top sm:shadow-lg-left w-full relative max-h-full overflow-x-hidden overlow-y-scroll rounded-2xl bg-section pb-6">
						<div className="block sm:hidden pt-3 pb-6 ">
							<div className="w-[120px] h-1 bg-neutral-weak mx-auto"></div>
						</div>
						<div
							className="sm:block hidden absolute top-4 right-4 p-2 hover:bg-neutral-weak rounded-xl cursor-pointer"
							onClick={() => {
								setSidebar(null);
							}}
						>
							<Icon icon="close" className="bg-neutral" />
						</div>
						{sidebarElement}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}

const useModal = () => useContext(ModalContext);
export default useModal;

export { ModalProvider };
