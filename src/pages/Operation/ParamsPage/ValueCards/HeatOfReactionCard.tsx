import * as STORE from "../../../../store";
import * as UNITS from '../../../../units';
import BaseCard from "./BaseCard";
import HeatIcon from "./icons/heat.png";

const HeatOfReactionCard = () => {
    const props = {
        label: "Heat of Reaction",
        icon: HeatIcon,
        name: "heatOfReaction",
        valueAction: STORE.SET_HEAT_OF_REACTION,
        unitAction: STORE.SET_HEAT_OF_REACTION_UNIT,
        unitList: UNITS.HEAT_UNITS_LIST,
    };

    return <BaseCard {...props} />;
};

export default HeatOfReactionCard;
