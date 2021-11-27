import { FC } from 'react';
import classes from './index.module.css';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  const rootClassName = className
    ? `${classes.root} ${className}`
    : classes.root;

  return <button className={rootClassName} {...props} />;
};
