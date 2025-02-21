'use client';
import { useEffect, useRef } from 'react';
import { Button } from '@/components';
import { CloseIcon } from '@/components/ui/Icons/';
import styles from './Modal.module.scss';
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, width, height }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const closeButton = closeButtonRef.current;

    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      closeButton?.focus();

      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }

    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    dialog.addEventListener('keydown', handleClose);

    return () => {
      dialog.removeEventListener('keydown', handleClose);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={onClose}
      style={{ width: width || 'auto', height: height || 'auto' }}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <Button
          ref={closeButtonRef}
          className={styles.closeButton}
          type='button'
          text={<CloseIcon />}
          color='icon'
          aria-label='close'
          onClick={onClose}
        />

        {children}
      </div>
    </dialog>
  );
};
