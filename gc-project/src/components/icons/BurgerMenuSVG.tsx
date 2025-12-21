import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

export default function BurgerMenuSVG(props: IconProps) {
  return (
    <svg
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 15H0V13H8V15ZM8 8.5H0V6.5H8V8.5ZM8 2H0V0H8V2Z"
        fill="currentColor"
      />
    </svg>
  );
}
