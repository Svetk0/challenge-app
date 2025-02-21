import { useEditChallengeMutation, useDeleteChallengeMutation } from '@/api/content';
import { TChallenge } from '@/types';
import { Button } from '@/components';
import staticData from '@/constants/data.json';
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
      const response = await editChallenge({
        uuid: challenge.uuid,
        dataEdit: {
          ...challenge,
          is_finished: true,
        },
      }).unwrap();

      console.log('Challenge marked as finished:', response);
      return response;
    } catch (error) {
      console.error('Failed to mark challenge as finished:', error);
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
  const [deleteChallenge] = useDeleteChallengeMutation();

  const handleDeleteChallenge = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await deleteChallenge({
        uuid: challenge.uuid,
      }).unwrap();

      console.log('Challenge was deleted:', response);
      return response;
    } catch (error) {
      console.error('Failed to delete challenge:', error);
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
