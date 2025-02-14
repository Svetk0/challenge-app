import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { Button } from '../ui/Button/Button';

const SendInitDataButton = () => {
  const isDevelopment = true; // режим разработки

  const handleClick = async () => {
    let initDataRaw: string;

    if (isDevelopment) {
      // Моковые данные для разработки
      initDataRaw =
        'user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%20%2B%20-%20%3F%20%5C%2F%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4FPEE4tmP3ATHa57u6MqTDih13LTOiMoKoLDRG4PnSA.svg%22%7D&chat_instance=8134722200314281151&chat_type=private&auth_date=1733584787&hash=2174df5b000556d044f3f020384e879c8efcab55ddea2ced4eb752e93e7080d6&signature=zL-ucjNyREiHDE8aihFwpfR9aggP2xiAo3NSpfe-p7IbCisNlDKlo7Kb6G4D0Ao2mBrSgEk4maLSdv6MLIlADQ';
    } else {
      // Реальные данные из TMA
      const { initDataRaw: rawData } = retrieveLaunchParams();

      if (typeof rawData !== 'string') {
        console.error('initDataRaw не является строкой');
        return;
      }

      initDataRaw = rawData;
    }

    try {
      const response = await fetch('https://challenge-app.site/api/test-auth/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `tma ${initDataRaw}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке initData');
      }

      const result = await response.json();
      console.log('Ответ сервера:', result);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return <Button type='submit' text='Отправить initData' color='default' onClick={handleClick} />;
};

export default SendInitDataButton;
