import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  loading?: boolean;
}

const Button = ({ label, loading, ...rest }: ButtonProps) => {
  return (
    <button
      data-testid="button"
      className={`relative 
        w-full 
        bg-primary
        my-4
        text-sm
        text-white
        rounded
        flex gap-1 
        items-center 
        justify-center 
        py-3 px-4 
        disabled:cursor-not-allowed
        disabled:bg-primary500`}
      disabled={loading}
      {...rest}
    >
      {loading ? "loading..." : label}
    </button>
  );
};

export default Button;
