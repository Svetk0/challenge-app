import { IconProps } from '@/shared/types';

export const HomeIcon = ({
  size = 24,
  color = '#BFFBE2',
  className,
  title = 'Home',
  id = 'homeIcon',
}: IconProps) => {
  const titleId = `${id}Title`;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 23'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-labelledby={titleId}
      focusable='false'
    >
      <title id={titleId}>{title}</title>
      <path
        d='M2 10.4151C2 9.66807 2.33407 8.96018 2.91073 8.48528L10.4107 2.30881C11.3339 1.54858 12.6661 1.54858 13.5893 2.30881L21.0893 8.48528C21.6659 8.96018 22 9.66807 22 10.4151V18.5C22 19.8807 20.8807 21 19.5 21H17C15.6193 21 14.5 19.8807 14.5 18.5V16.4412C14.5 15.0605 13.3807 13.9412 12 13.9412V13.9412C10.6193 13.9412 9.5 15.0605 9.5 16.4412V18.5C9.5 19.8807 8.38071 21 7 21H4.5C3.11929 21 2 19.8807 2 18.5V10.4151Z'
        stroke={color}
        strokeWidth='2.5'
        strokeLinejoin='round'
      />
    </svg>
  );
};
