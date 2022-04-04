import BaseCard from "./BaseCard";
import { SET_HEAT_OF_REACTION, SET_HEAT_OF_REACTION_UNIT } from 'store';
import { HEAT_UNITS_LIST } from 'units';
import HeatIcon from "./icons/heat.png";

const HeatOfReactionCard = () => {
    const props = {
        label: "Heat of Reaction",
        icon: HeatIcon,
        name: "heatOfReaction",
        valueAction: SET_HEAT_OF_REACTION,
        unitAction: SET_HEAT_OF_REACTION_UNIT,
        unitList: HEAT_UNITS_LIST,
    };

    return <BaseCard {...props} />;
};

export default HeatOfReactionCard;
