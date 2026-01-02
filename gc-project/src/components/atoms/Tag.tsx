import classNames from "classnames";

export default function Tag({
  label,
  className,
  ...props
}: {
  label: string | number;
  className?: string;
}) {
  return (
    <span
      className={classNames(
        "backdrop-blur-220 pointer-events-none rounded-sm border px-3 py-1 text-[12px] text-nowrap text-gray-800 md:text-sm",
        className,
      )}
      {...props}
    >
      {label}
    </span>
  );
}
