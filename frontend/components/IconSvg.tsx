import React, { FC } from "react";

type IconSvgProps = {
  name: string;
  color?: string;
};

const IconSvg: FC<IconSvgProps> = ({ name, color }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d={name} fill={color} />
    </svg>
  );
};

export default IconSvg;
