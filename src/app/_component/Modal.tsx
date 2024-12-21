import React, { ReactNode, useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (visible) {
      setAnimate(visible);
    }
    setAnimate(isOpen);
  }, [isOpen, visible]);

  if (!isOpen && !visible) return null;
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#404040] bg-opacity-70 
    ${animate ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}
      onClick={onClose}
    >
      <div
        className={`shadow-2xl transform 
        ${animate ? 'scale-100' : 'scale-95'} transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
