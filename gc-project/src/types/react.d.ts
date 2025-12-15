//
export type ElementOrElementRef<T extends Element = Element> =
  | T
  | React.RefObject<T | null>
  | null;
export type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;
