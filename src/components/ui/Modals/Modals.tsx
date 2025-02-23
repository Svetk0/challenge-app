'use client';
import { useEffect, useRef } from 'react';
import { Button } from '@/components';
import { CloseIcon } from '@/components/ui/Icons/';
import { DeleteChallengeButton } from '@/shared/entities/ControlChallenge';
import { TChallenge } from '@/types';
import staticData from '@/constants/data.json';

import styles from './Modals.module.scss';

const { title, text_1, text_2 } = staticData.modals.modal_delete;
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
type Props = {
  challenge: TChallenge;
} & ModalProps;

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
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
    <dialog ref={dialogRef} className={styles.dialog} onClick={onClose}>
      <section className={styles.content} onClick={(e) => e.stopPropagation()}>
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
      </section>
    </dialog>
  );
};

export function ModalDelete({ onClose, isOpen, challenge }: Props) {
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

        <DeleteChallengeButton challenge={challenge} />
      </div>
    </Modal>
  );
}
