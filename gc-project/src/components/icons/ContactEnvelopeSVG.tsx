import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

export default function ContactEnvelope(props: IconProps) {
  return (
    <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    >
      <path
        d="M33.3333 6.66602H6.66665C4.82831 6.66602 3.33331 8.16102 3.33331 9.99935V29.9993C3.33331 31.8377 4.82831 33.3327 6.66665 33.3327H33.3333C35.1717 33.3327 36.6667 31.8377 36.6667 29.9993V9.99935C36.6667 8.16102 35.1717 6.66602 33.3333 6.66602ZM33.3333 9.99935V10.851L20 21.2227L6.66665 10.8527V9.99935H33.3333ZM6.66665 29.9993V15.0727L18.9766 24.6477C19.2685 24.8769 19.6289 25.0015 20 25.0015C20.3711 25.0015 20.7315 24.8769 21.0233 24.6477L33.3333 15.0727L33.3367 29.9993H6.66665Z"
        fill="currentColor"
      />
    </svg>
  );
}
