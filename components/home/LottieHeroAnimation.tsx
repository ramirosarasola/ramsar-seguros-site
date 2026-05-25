'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((m) => m.DotLottieReact),
  {
    ssr: false,
    loading: () => <div className="w-full aspect-square" aria-hidden="true" />,
  }
);

const DESKTOP_BREAKPOINT = '(min-width: 1024px)';

export function LottieHeroAnimation() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BREAKPOINT);
    if (mq.matches) setShouldLoad(true);
  }, []);

  if (!shouldLoad) return <div className="w-full aspect-square" aria-hidden="true" />;

  return (
    <DotLottieReact
      src="/animations/family-insurance.lottie"
      autoplay
      className="w-full max-w-120 h-auto mx-auto"
      aria-hidden="true"
    />
  );
}
