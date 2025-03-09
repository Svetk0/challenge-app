'use client';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/lib/store';
import { cn } from '@/shared/utils';
import { Button, Congratulations } from '@/shared/ui';
import { CloseIcon } from '@/shared/ui/Icons';
import { DeleteChallengeButton } from '@/features';
import { TChallenge } from '@/shared/types';
import staticData from '@/shared/constants/data.json';

import styles from './Modals.module.scss';

export interface ModalProps {
  isOpen: boolean;
  color?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, color, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = '';
      }
    }

    dialog.addEventListener('keydown', handleClose);

    return () => {
      dialog.removeEventListener('keydown', handleClose);
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog ref={dialogRef} className={cn(styles.dialog, color && styles[color])} onClick={onClose}>
      <section className={styles.content} onClick={(e) => e.stopPropagation()}>
        <Button
          className={styles.closeButton}
          type='button'
          text={<CloseIcon />}
          color='icon'
          aria-label='close'
          onClick={onClose}
        />
        {children}
      </section>
    </dialog>
  );
};

// Delete Confirmation
type Props = {
  challenge: TChallenge;
} & ModalProps;
const { title, text_1, text_2 } = staticData.modals.modal_delete;

export function ModalDelete({ onClose, isOpen, challenge }: Props) {
  const errorData = useSelector((state: RootState) => state.error.error);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h3>{title}</h3>
        <p>
          {text_1} <br />
          <span>{challenge.description}</span>
          <br />
          {text_2}
        </p>
        {errorData && <div className={styles.error}> {errorData.user_message}</div>}
        <DeleteChallengeButton challenge={challenge} />
      </div>
    </Modal>
  );
}

export function ModalCongrats({ onClose, isOpen }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} color='transparent'>
      <Congratulations onClose={onClose} />
    </Modal>
  );
}
