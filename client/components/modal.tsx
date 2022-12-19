import React, { useEffect, useRef } from "react";
import ReactPortal from "./react-portal";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  handleClose: () => void;
}

export default function Modal({ children, isOpen, className, handleClose }: ModalProps) {
  const nodeRef = useRef(null);
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if(isOpen && e.key === "Escape"){
        handleClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="portal-root">
      <div className={`position-fixed fill-area bg-shadow z-index-10 d-flex justify-content-center align-items-center ${isOpen ? "" : "d-none"}`} onClick={handleClose} ref={nodeRef}>
        <div className={`card d-block shadow-sm p-3 ${className || ""}`} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ReactPortal>
  );
}
