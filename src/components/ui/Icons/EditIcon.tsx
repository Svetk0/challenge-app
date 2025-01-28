type IconProps = {
  size?: number;
  color?: string;
  className?: string;
  title?: string;
  id?: string;
};

export const EditIcon = ({
  size = 31,
  color = '#9199F3',
  className,
  title = 'Edit challenge',
  id = 'editIcon',
}: IconProps) => {
  const titleId = `${id}Title`;

  return (
    <svg
      width={size}
      height={size + 1}
      viewBox='0 0 31 32'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-labelledby={titleId}
      focusable='false'
    >
      <title id={titleId}>{title}</title>
      <g filter='url(#filter0_d_301_656)'>
        <path
          d='M21.9101 12.1539L14.3833 19.6808C14.1041 19.96 13.7485 20.1503 13.3613 20.2277L10.125 20.875L10.7722 17.6386C10.8497 17.2515 11.04 16.8959 11.3192 16.6167L18.8459 9.08978M21.9101 12.1539L23.5011 10.5629C23.8916 10.1724 23.8916 9.53923 23.5011 9.14871L21.8511 7.49879C21.4606 7.10827 20.8275 7.10827 20.4369 7.49879L18.8459 9.08978M21.9101 12.1539L18.8459 9.08978'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.4165 24.6667H22.5832'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_301_656'
          x='-4'
          y='-3'
          width='38'
          height='38'
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
          <feOffset />
          <feGaussianBlur stdDeviation='3' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.878431 0 0 0 0 0.960784 0 0 0 0 0.92549 0 0 0 0.4 0'
          />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_301_656' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_301_656'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
