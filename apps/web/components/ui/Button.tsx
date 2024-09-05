import { ButtonHTMLAttributes } from 'react';

type Variant = 'default' | 'secondary' | 'outline';

type ButtonProps = {
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const styles: Record<Variant, string> = {
  default:
    'w-fit text-[color:white] bg-primary px-8 py-4 rounded-full text-md font-semibold',
  secondary:
    'w-fit text-primary bg-secondary px-8 py-4 rounded-full text-md font-semibold',
  outline:
    'w-fit text-primary px-6 py-2 rounded-full text-md font-semibold border border-primary'
};

export default function Button({
  children,
  variant = 'default',
  ...rest
}: ButtonProps) {
  return (
    <button className={styles[variant]} {...rest}>
      {children}
    </button>
  );
}
