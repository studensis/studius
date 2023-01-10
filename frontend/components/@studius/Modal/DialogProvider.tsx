'use client';

import classNames from 'classnames';
import React, { createContext, useContext, useState } from 'react';
import Icon from '../Icon/Icon';

interface IModalContext {
	dialogElement: React.ReactNode | null;
	dialogType: 'MODAL' | 'SIDEBAR';

	setModal: (element: React.ReactNode | null) => void;
	setSidebar: (element: React.ReactNode | null) => void;
}

const ModalContext = createContext<IModalContext>({
	dialogElement: null,
	dialogType: 'MODAL',
	setModal: (element) => {},
	setSidebar: (element) => {},
});

function ModalProvider({ children }: { children: React.ReactNode }) {
	const [sidebarElement, setSidebarElement] = useState<React.ReactNode | null>(
		null
	);
	const [dialogType, setModalType] = useState<'MODAL' | 'SIDEBAR'>('SIDEBAR');

	return (
		<>
			<ModalContext.Provider
				value={{
					dialogElement: sidebarElement,
					dialogType: dialogType,
					setModal: (element) => {
						if (element) {
							setSidebarElement(element);
							setModalType('MODAL');
						} else {
							setSidebarElement(null);
						}
					},
					setSidebar: (element) => {
						if (element) {
							setSidebarElement(element);
							setModalType('SIDEBAR');
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

export function DialogOverlay() {
	const { dialogElement, dialogType, setSidebar } = useModal();
	return (
		<>
			{dialogElement ? (
				<div
					className={classNames(
						'fixed',
						dialogType === 'MODAL'
							? 'bg-neutral-medium'
							: 'bg-neutral-medium sm:bg-transparent',
						'top-0 left-0 right-0 md:bottom-0 opacity-80 h-screen'
					)}
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

export function Dialog() {
	const { dialogElement, setSidebar, dialogType } = useModal();
	return (
		<>
			{dialogElement ? (
				<div
					className={classNames(
						'md:fixed absolute',
						'overflow-y-scroll',
						'pt-6 sm:px-6 sm:pb-6',
						// desktop for Modal or Sidebar
						dialogType === 'MODAL'
							? 'left-[50%] translate-x-[-50%] sm:top-2 sm:w-full max-w-[900px] w-full'
							: 'right-0 sm:top-24 sm:w-[360px] w-full',
						// mobile dialog
						'bottom-0 top-2'
					)}
				>
					<div
						className={classNames(
							'rounded-t-2xl sm:rounded-b-2xl',
							'shadow-sm-top sm:shadow-lg-left w-full relative h-full sm:h-auto max-h-full overflow-x-hidden overlow-y-scroll bg-section pb-6'
						)}
					>
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
						{dialogElement}
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
