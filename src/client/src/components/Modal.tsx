import React from "react";
import {useEffect} from "react";

interface ModalPropTypes {
    children: any,
    isOpen: boolean,
    onClose: () => void,
    setIsOpen: (val:boolean) => void,
    position: string
}

const Modal = ({children, isOpen, setIsOpen, onClose, position = "my-auto mx-auto"}: ModalPropTypes) => {
    const handleClose = (e) => {
        setIsOpen(false);
        onClose();
    };

    useEffect(() => {
        isOpen?document.body.classList.add("modal-open"):document.body.classList.remove("modal-open");
    }, [isOpen])

    return (
        isOpen && (
            <React.Fragment>
                <div
                    className="bg-blue-800/40 fixed top-0 right-0 left-0 bottom-0 z-40"
                />

                <div className={`fixed top-0 right-0 left-0 h-screen w-screen z-40 flex justify-content-center`} onMouseDown={handleClose}>
                    <div
                        className={`${position} items-center bg-white min-w-2xl rounded-lg overflow-hidden h-fit w-fit`} onMouseDown={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </React.Fragment>
        )
    )
}
export default Modal;