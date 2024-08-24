import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onclose, isopen, children }) => {
    return createPortal(
        <>
            {isopen && (
                <div className="grid place-items-center absolute top-0 z-45 h-screen backdrop-blur w-screen">
                    <div className="m-auto relative z-50 min-h-[200px] min-w-[80%] bg-white p-4">
                        <div className="flex justify-end">
                            <AiOutlineClose onClick={onclose} className="text-2xl self-end" />
                        </div>
                        {children}
                    </div>
                    {/* <div className="absolute top-0 z-45 h-screen backdrop-blur w-screen"/> */}
                </div>
            )}
        </>,
        document.getElementById("modal-root")
    );
};

export default Modal;
