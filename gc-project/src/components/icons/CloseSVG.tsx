import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

export default function CloseSVG(props: IconProps) {
  return (
    <svg
      width="11"
      height="15"
      viewBox="0 0 11 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6738 1.13867L6.28027 7.4834L9.70312 13.0459L8 14.0938L5.03711 9.2793L1.67383 14.1387L0.0292969 13L3.89258 7.41895L0 1.09375L1.70312 0.0449219L5.13574 5.62305L9.0293 0L10.6738 1.13867Z"
        fill="currentColor"
      />
    </svg>
  );
}
