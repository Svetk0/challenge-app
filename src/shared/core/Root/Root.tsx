'use client';
import { type PropsWithChildren } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';

import { ErrorBoundary, Loading, ErrorApi } from '@/shared/ui';
import { useTelegramMock, useDidMount, useClientOnce } from '@/shared/utils/hooks';

import { init } from '@/shared/core';

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development';

  // Mock Telegram environment in development mode if needed.
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === 'debug';

  // Initialize the library.
  useClientOnce(() => {
    init(debug);
  });

  return <>{children}</>;
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorApi}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <Loading />
  );
}
