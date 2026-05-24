'use client';

import dynamic from 'next/dynamic';

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((m) => m.DotLottieReact),
  { ssr: false }
);

export function LottieHeroAnimation() {
  return (
    <DotLottieReact
      src="/animations/family-insurance.lottie"
      autoplay
      className="w-full max-w-120 h-auto mx-auto"
      aria-hidden="true"
    />
  );
}
