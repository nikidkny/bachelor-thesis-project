export interface IconProps extends React.SVGProps<SVGSVGElement> {}

export default function LeftArrowSVG(props: IconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.15909 14.3182L0 7.15909L7.15909 0L8.80682 1.63352L4.48153 5.95881H14.6165V8.35938H4.48153L8.80682 12.6776L7.15909 14.3182Z"
        fill="#6C6C6C"
      />
    </svg>
  );
}
