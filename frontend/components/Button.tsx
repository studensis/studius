import Image from "next/image";
import { FC, ReactNode } from "react";
import IconPlaceholder from "../public/assets/icon-placeholder.png";
import Icon, { IconName } from "./Icon";

type ButtonType = "primary" | "secondary";

type ButtonProps = {
  children?: ReactNode | ReactNode[];
  small?: boolean;
  type?: ButtonType;
  outline?: boolean;
  active?: boolean;
  disabled?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
  darkMode?: boolean;
  style?: any;
  onClick?: any;
  formType?: any;
};

const Button: FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  disabled,
  outline,
  small,
  children,
  darkMode,
  style,
  onClick,
  formType,
}) => {
  return (
    <button onClick={onClick} type={formType}>
      <div className="select-none">
        <div
          style={style ?? style}
          className={
            children
              ? outline == true
                ? disabled == true
                  ? "flex justify-center items-center py-2 px-4 bg-white text-[#005DFF] w-max h-[40px] rounded-2xl opacity-40 border-2"
                  : "flex justify-center items-center py-2 px-4 bg-white text-[#005DFF] border-2 w-max h-[40px] rounded-2xl hover:opacity-80 hover:bg-[#C0D3F7] hover:border-[#005DFF] active:opacity-50 active:bg-[#005DFF] active:text-white "
                : disabled == true
                ? "flex justify-center items-center py-2 px-4 bg-[#005DFF] text-white w-max h-[40px] rounded-2xl opacity-20"
                : "flex justify-center items-center py-2 px-4 bg-[#005DFF] text-white w-max h-[40px] rounded-2xl hover:opacity-80 active:opacity-50"
              : outline == true
              ? disabled == true
                ? "flex justify-center items-center py-2 px-4 bg-white text-[#005DFF] w-[40px] h-[40px] rounded-2xl opacity-40 border-2"
                : "flex justify-center items-center py-2 px-4 bg-white text-[#005DFF] border-2 [40px] h-[40px] rounded-2xl hover:opacity-80 hover:bg-[#C0D3F7] hover:border-[#005DFF] active:opacity-50 active:bg-[#005DFF] active:text-white "
              : disabled == true
              ? "flex justify-center items-center py-2 px-4 bg-[#005DFF] text-white w-[40px] h-[40px] rounded-2xl opacity-20"
              : "flex justify-center items-center py-2 px-4 bg-[#005DFF] text-white w-[40px] h-[40px] rounded-2xl hover:opacity-80 active:opacity-50"
          }
        >
          <h1
            className={
              small == true
                ? "button-small justify-center flex items-center gap-1"
                : "button-large justify-center flex items-center gap-1"
            }
          >
            {leftIcon && (
              <Icon
                className="flex"
                icon={leftIcon}
                size={small == true ? 12 : 16}
                color={darkMode ? "white" : "#005DFF"}
              />
            )}
            {children}
            {rightIcon && (
              <Icon
                className="flex"
                icon={rightIcon}
                size={small == true ? 12 : 16}
                color={darkMode ? "white" : "#005DFF"}
              />
            )}
          </h1>
        </div>
      </div>
    </button>
  );
};

export { Button };
