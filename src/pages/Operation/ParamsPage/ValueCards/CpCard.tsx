import BaseCard from "./BaseCard";
import { SET_CP, SET_CP_UNIT } from 'store';
import { CP_UNITS_LIST } from 'units';
import CpIcon from "./icons/cp.png";

const CpCard = () => {
    const props = {
        label: "Specific Heat Capacity (mixture)",
        icon: CpIcon,
        name: "cp",
        valueAction: SET_CP,
        unitAction: SET_CP_UNIT,
        unitList: CP_UNITS_LIST,
    };

    return <BaseCard {...props} />;
};

export default CpCard;
