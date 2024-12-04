import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  id: string;
  label?: string;
  error?: "true" | "false";
  errorMessage?: string;
  customClass?: string;
}

const Input = ({
  id,
  label,
  error,
  errorMessage,
  name,
  customClass, // Refactor to use tailwind-merge
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full relative my-2">
        {label && (
          <label htmlFor={id} className="text-sm">
            {label}
          </label>
        )}

        <input
          data-testid="input"
          id={id}
          name={name}
          data-error={error}
          autoComplete="off"
          {...rest}
          className={cn(
            `w-full h-10 mt-1 border-slate-300 text-sm border rounded outline-none transition ps-4`,
            customClass
          )}
        />
      </div>
      {error === "true" && (
        <small className="text-red-700 relative -top-2">{errorMessage}</small>
      )}
    </div>
  );
};

export default Input;
