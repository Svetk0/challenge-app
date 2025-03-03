import { useRouter } from 'next/navigation';
import { useEditChallengeMutation, useDeleteChallengeMutation } from '@/shared/api/content';
import { useErrorHandler, useNotificationHandler } from '@/shared/utils/hooks';
import { TChallenge } from '@/shared/types';
import { Button } from '@/shared/ui';
import { EditIcon } from '@/shared/ui/Icons';
import staticData from '@/shared/constants/data.json';

type Props = {
  challenge: TChallenge;
};
const {
  buttons: { complete, remove },
  errors: { complete: complete_error, delete: delete_error },
  toasts: { complete: complete_toast, delete: delete_toast },
} = staticData.challenge_info;

export function CompleteChallengeButton({ challenge }: Props) {
  const { handleError } = useErrorHandler();
  const { handleNotification, clearCurrentNotification } = useNotificationHandler();
  const [editChallenge] = useEditChallengeMutation();

  const handleFinishChallenge = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await editChallenge({
        uuid: challenge.uuid,
        dataEdit: {
          is_finished: true,
        },
      }).unwrap();
      handleNotification(complete_toast);
    } catch (error) {
      clearCurrentNotification();
      handleError(error, complete_error);
      throw error;
    }
  };
  return (
    <Button
      type='button'
      text={complete}
      color='control'
      onClick={(e) => handleFinishChallenge(e)}
    />
  );
}

export function DeleteChallengeButton({ challenge }: Props) {
  const { handleError } = useErrorHandler();
  const { handleNotification, clearCurrentNotification } = useNotificationHandler();
  const [deleteChallenge] = useDeleteChallengeMutation();

  const handleDeleteChallenge = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteChallenge({
        uuid: challenge.uuid,
      }).unwrap();
      handleNotification(delete_toast);
    } catch (error) {
      clearCurrentNotification();
      handleError(error, delete_error);
      throw error;
    }
  };
  return (
    <Button
      type='button'
      text={remove}
      color='control_red'
      onClick={(e) => handleDeleteChallenge(e)}
    />
  );
}

export function EditChallengeIconButton({ challenge }: Props) {
  const router = useRouter();
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/challenges/edit/${challenge.uuid}`);
  };
  return (
    <Button
      type='button'
      text={<EditIcon id={`editIcon-${challenge.uuid}`} />}
      color='icon'
      onClick={(e) => handleEditClick(e)}
    />
  );
}
