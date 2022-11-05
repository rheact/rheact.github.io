import { useState } from 'react'
import BaseCard from "./BaseCard";
import { SET_HEAT_OF_REACTION, SET_HEAT_OF_REACTION_UNIT } from 'store';
import { Tooltip } from "reactstrap";
import { HEAT_UNITS_LIST } from 'units';
import HeatIcon from "./icons/heat.png";

const HeatOfReactionCard = () => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const hint = (
        <>
            <span>
                Heat of Reaction
                <i style={{marginLeft: "10px"}} id="heatOfReactionHint" className="bi bi-question-circle"></i>
            </span>
            <Tooltip
                style={{textTransform: "none"}}
                placement="top"
                isOpen={tooltipOpen}
                autohide={false}
                target="heatOfReactionHint"
                toggle={toggle}
            >
                Include negative sign for exothermic reactions and no sign needed for endothermic reactions.
            </Tooltip>
        </>
    )

    const props = {
        labelText: "Heat of Reaction",
        labelNode: hint,
        icon: HeatIcon,
        name: "heatOfReaction",
        valueAction: SET_HEAT_OF_REACTION,
        unitAction: SET_HEAT_OF_REACTION_UNIT,
        unitList: HEAT_UNITS_LIST,
    };
    return <BaseCard {...props} />;
};

export default HeatOfReactionCard;
