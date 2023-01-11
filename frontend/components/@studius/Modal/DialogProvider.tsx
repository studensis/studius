'use client';

import classNames from 'classnames';
import React, { createContext, useContext, useState } from 'react';
import Icon from '../Icon/Icon';

interface IDialogContext {
	dialogElement: React.ReactNode | null;
	dialogType: 'MODAL' | 'SIDEBAR';

	setModal: (element: React.ReactNode | null) => void;
	setSidebar: (element: React.ReactNode | null) => void;
}

const DialogContext = createContext<IDialogContext>({
	dialogElement: null,
	dialogType: 'MODAL',
	setModal: (element) => {},
	setSidebar: (element) => {},
});

function DialogProvider({ children }: { children: React.ReactNode }) {
	const [sidebarElement, setSidebarElement] = useState<React.ReactNode | null>(
		null
	);
	const [dialogType, setModalType] = useState<'MODAL' | 'SIDEBAR'>('SIDEBAR');

	return (
		<>
			<DialogContext.Provider
				value={{
					dialogElement: sidebarElement,
					dialogType: dialogType,
					setModal: (element) => {
						if (element) {
							setSidebarElement(element);
							setModalType('MODAL');
							document.body.classList.add('overflow-y-hidden');
							document.body.classList.add('sm:overflow-y-auton');
						} else {
							setSidebarElement(null);
							document.body.classList.add('overflow-y-hidden');
							document.body.classList.add('sm:overflow-y-auto');
						}
					},
					setSidebar: (element) => {
						if (element) {
							setSidebarElement(element);
							setModalType('SIDEBAR');
							document.body.classList.add('overflow-y-hidden');
							document.body.classList.add('sm:overflow-y-auto');
						} else {
							setSidebarElement(null);
							document.body.classList.remove('overflow-y-hidden');
							document.body.classList.remove('sm:overflow-y-auto');
						}
					},
				}}
			>
				{children}
			</DialogContext.Provider>
		</>
	);
}

export function DialogOverlay() {
	const { dialogElement, dialogType, setSidebar } = useDialog();
	return (
		<>
			{dialogElement ? (
				<div
					className={classNames(
						'fixed cursor-pointer z-40',
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
	const { dialogElement, setSidebar, dialogType } = useDialog();
	return (
		<>
			{dialogElement ? (
				<div
					className={classNames(
						'z-40',
						'md:fixed fixed',
						// 'sm:mx-6 sm:mb-6',
						// desktop for Modal or Sidebar
						dialogType === 'MODAL'
							? 'left-[50%] translate-x-[-50%] sm:top-2 sm:w-full max-w-[900px] w-full'
							: 'right-0 sm:top-24 sm:w-[360px] w-full',
						// mobile dialog
						'bottom-0 top-20 overflow-y-scroll'
					)}
				>
					<div
						className={classNames(
							'rounded-t-2xl sm:rounded-b-2xl',
							'overflow-y-scroll',
							dialogType === 'MODAL'
								? 'shadow-sm-top sm:shadow-lg-top'
								: 'shadow-sm-top sm:shadow-lg-left',
							'w-full relative h-full sm:h-auto max-h-full overflow-x-hidden bg-section pb-6'
						)}
					>
						<div className="block sm:hidden pt-3 pb-6">
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

const useDialog = () => useContext(DialogContext);
export default useDialog;

export { DialogProvider };
