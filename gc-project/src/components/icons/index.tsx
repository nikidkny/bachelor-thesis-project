import LeftArrowSVG from "./LeftArowSVG";
import BurgerMenuSVG from "../icons/BurgerMenuSVG";
import CloseSVG from "../icons/CloseSVG";
import HelpSVG from "./HelpSVG";
import ChevronRightSVG from "./ChevronRightSVG";
import ChevronDownSVG from "./ChevronDownSVG";
import ChevronUpSVG from "./ChevronUpSVG";


export const icons = {
    leftArrowIcon: LeftArrowSVG,
    burgerMenuIcon: BurgerMenuSVG,
    closeIcon: CloseSVG,
    helpIcon: HelpSVG,
    chevronRightIcon: ChevronRightSVG,
    chevronUpIcon: ChevronUpSVG,
    chevronDownIcon: ChevronDownSVG,
};
export type IconType = keyof typeof icons;