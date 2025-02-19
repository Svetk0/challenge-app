// import { useEffect, useState } from 'react';
// import { WebApp } from '@telegram-apps/sdk';

export const useTelegramAuth = () => {
  console.log('useTelegramAuth');
};
//   const [initData, setInitData] = useState<string | null>(null);
//   const [isReady, setIsReady] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const initTelegram = async () => {
//       try {
//         // Инициализация WebApp
//         await WebApp.ready();
//         setIsReady(true);

//         // Получение initData
//         const { initDataRaw } = WebApp.getLaunchParams();
//         if (typeof initDataRaw === 'string') {
//           setInitData(initDataRaw);
//         } else {
//           setError('Invalid initData format');
//         }

//         // Настройка основного цвета из темы Telegram
//         document.documentElement.style.setProperty(
//           '--tg-theme-button-color',
//           WebApp.themeParams.button_color
//         );
//         document.documentElement.style.setProperty(
//           '--tg-theme-button-text-color',
//           WebApp.themeParams.button_text_color
//         );
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to initialize Telegram WebApp');
//       }
//     };

//     initTelegram();
//   }, []);

//   return { initData, isReady, error };
// };
