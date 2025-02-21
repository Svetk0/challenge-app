import { IconProps } from '@/types';

export const CloseIcon = ({
  size = 44,
  color = '#F6FFFB',
  className,
  title = 'Close',
  id = 'closeIcon',
}: IconProps) => {
  const titleId = `${id}Title`;

  return (
    <svg
      width={size}
      height={size + 1}
      viewBox='0 0 44 44'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-labelledby={titleId}
      focusable='false'
    >
      <title id={titleId}>{title}</title>
      <g filter='url(#filter0_d_5_286)'>
        <circle cx='21' cy='20' r='20' fill='none' />
      </g>
      <path
        d='M26.9999 25.9999L21 20M21 20L15 14M21 20L27 14M21 20L15 26'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <filter
          id='filter0_d_5_286'
          x='0'
          y='0'
          width='44'
          height='44'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='1' dy='2' />
          <feGaussianBlur stdDeviation='1' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.0627451 0 0 0 0 0.0117647 0 0 0 0 0.203922 0 0 0 0.4 0'
          />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_5_286' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_5_286' result='shape' />
        </filter>
      </defs>
    </svg>
  );
};
