import BaseCard from "./BaseCard";
import { SET_PRESSURE, SET_PRESSURE_UNIT } from 'store';
import { PRESSURE_UNITS_LIST } from 'units';
import PressureIcon from "./icons/pressure.png";

const PressureCard = () => {
    const props = {
        labelText: "Pressure",
        labelNode: "Pressure",
        icon: PressureIcon,
        name: "pressure",
        valueAction: SET_PRESSURE,
        unitAction: SET_PRESSURE_UNIT,
        unitList: PRESSURE_UNITS_LIST,
    };

    return <BaseCard {...props} />;
};

export default PressureCard;
