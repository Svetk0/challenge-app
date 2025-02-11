type IconProps = {
  size?: number;
  color?: string;
  className?: string;
  title?: string;
  id?: string;
};

export const ClipboardIcon = ({
  size = 24,
  color = '#BFFBE2',
  className,
  title = 'Clipboard',
  id = 'clipboardIcon',
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
        d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H10M15 5H17C18.1046 5 19 5.89543 19 7V12'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13 19L15 21L20 16'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
