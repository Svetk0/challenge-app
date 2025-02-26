import { useRouter } from 'next/navigation';
import { useEditChallengeMutation, useDeleteChallengeMutation } from '@/shared/api/content';
import { TChallenge } from '@/shared/types';
import { Button } from '@/shared/ui';
import { EditIcon } from '@/shared/ui/Icons';
import staticData from '@/shared/constants/data.json';
type Props = {
  challenge: TChallenge;
};
const {
  buttons: { complete, remove },
} = staticData.challenge_info;

export function CompleteChallengeButton({ challenge }: Props) {
  const [editChallenge] = useEditChallengeMutation();

  const handleFinishChallenge = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await editChallenge({
        uuid: challenge.uuid,
        dataEdit: {
          ...challenge,
          is_finished: true,
        },
      }).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to complete challenge');
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
  const [deleteChallenge] = useDeleteChallengeMutation();

  const handleDeleteChallenge = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteChallenge({
        uuid: challenge.uuid,
      }).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to delete challenge');
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
