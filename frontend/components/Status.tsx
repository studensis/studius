import React, { FC, ReactNode } from "react";

type StatusProps = {
  children?: ReactNode | ReactNode[];
  color: string;
  className?: string;
};

const Status: FC<StatusProps> = ({ className, color, children }) => {
  return (
    <div
      className={
        color == "blue"
          ? "flex justify-center items-center body2 text-[#50B5FF] rounded-xl bg-[rgba(80,181,255,0.06)] py-[6px] px-[12px] gap-2 w-max"
          : color == "green"
          ? "flex justify-center items-center body2 text-[#359A73] rounded-xl bg-[rgba(53,154,115,0.06)] py-[6px] px-[12px] gap-2 w-max"
          : color == "red"
          ? "flex justify-center items-center body2 text-[#DB5125] rounded-xl bg-[rgba(219,81,37,0.06)] py-[6px] px-[12px] gap-2 w-max"
          : color == "yellow"
          ? "flex justify-center items-center body2 text-[#CB8A14] rounded-xl bg-[rgba(203,138,20,0.06)] py-[6px] px-[12px] gap-2 w-max"
          : ""
      }
    >
      {children}
    </div>
  );
};

export default Status;
