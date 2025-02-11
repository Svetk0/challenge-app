type IconProps = {
  size?: number;
  color?: string;
  className?: string;
  title?: string;
  id?: string;
};

export const ChartIcon = ({
  size = 24,
  color = '#BFFBE2',
  className,
  title = 'Chart',
  id = 'chartIcon',
}: IconProps) => {
  const titleId = `${id}Title`;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-labelledby={titleId}
      focusable='false'
    >
      <title id={titleId}>{title}</title>
      <path
        d='M16 10V17'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 7V17'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <rect
        x='3'
        y='3'
        width='18'
        height='18'
        rx='2'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 13L8 17'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
