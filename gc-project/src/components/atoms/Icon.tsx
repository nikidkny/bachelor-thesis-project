import {memo} from "react";
import { IconType,icons } from "../icons";


export type IconProps = React.ComponentProps<"svg"> & {
    id: IconType;
};
function Icon({ id, ...props }: IconProps) {
  const Icon = icons[id];

  return <Icon {...props} />;
}

export default memo(Icon);
