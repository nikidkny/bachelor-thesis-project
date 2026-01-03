import LeftArrowSVG from "./LeftArowSVG";
import BurgerMenuSVG from "../icons/BurgerMenuSVG";
import CloseSVG from "../icons/CloseSVG";
import HelpSVG from "./HelpSVG";
import ChevronRightSVG from "./ChevronRightSVG";
import ChevronDownSVG from "./ChevronDownSVG";
import ChevronUpSVG from "./ChevronUpSVG";
import CheckmarkSVG from "./CheckmarkSVG";
import FilterSVG from "./FilterSVG";
import ContactEnvelopeSVG from "./ContactEnvelopeSVG";

export const icons = {
    leftArrowIcon: LeftArrowSVG,
    burgerMenuIcon: BurgerMenuSVG,
    closeIcon: CloseSVG,
    helpIcon: HelpSVG,
    chevronRightIcon: ChevronRightSVG,
    chevronUpIcon: ChevronUpSVG,
    chevronDownIcon: ChevronDownSVG,
    checkmarkIcon: CheckmarkSVG,
    filterIcon: FilterSVG,
    contactIcon: ContactEnvelopeSVG,
};
export type IconType = keyof typeof icons;