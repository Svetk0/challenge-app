import { IconProps } from '@/shared/types';

export const ArrowIcon = ({
  size = 30,
  color = '#9199F3',
  className,
  title = 'ArrowIcon',
  id = 'arrowIcon',
}: IconProps) => {
  const titleId = `${id}Title`;

  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox='0 0 36 31'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title id={titleId}>{title}</title>
      <g filter='url(#filter0_d_133_390)'>
        <path
          d='M9.25 11.251L18 20.001L26.75 11.251'
          stroke={color}
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_133_390'
          x='0.25'
          y='4.25104'
          width='35.5'
          height='26.75'
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
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='4' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.182083 0 0 0 0 0.299301 0 0 0 0 0.316667 0 0 0 0.32 0'
          />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_133_390' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_133_390'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
