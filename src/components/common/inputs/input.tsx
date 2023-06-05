import { FC, HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
}

const Input: FC<InputProps> = (props: InputProps) => {
  const {
    label,
    placeholder,
    type = "text",
    className = "",
    value,
    onChange = () => {},
    ...restProps
  } = props;

  const concatClassName = [
    className,
    "w-full border border-solid border-secondary py-3 px-4 rounded text-xs outline-0",
  ].join(" ");

  return (
    <div className="flex flex-col items-center justify-center">
      {label && (
        <p className="font-semibold mt-5 mb-1.5 text-sm text-gray-400 w-full">
          {label}
        </p>
      )}
      <input
        className={concatClassName}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        type={type}
        {...restProps}
      />
    </div>
  );
};

export default Input;
