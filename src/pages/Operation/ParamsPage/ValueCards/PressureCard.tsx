import * as STORE from "../../../../store";
import * as UNITS from '../../../../units';
import BaseCard from "./BaseCard";
import PressureIcon from "./icons/pressure.png";

const PressureCard = () => {
    const props = {
        label: "Pressure",
        icon: PressureIcon,
        name: "pressure",
        valueAction: STORE.SET_PRESSURE,
        unitAction: STORE.SET_PRESSURE_UNIT,
        unitList: UNITS.PRESSURE_UNITS_LIST,
    };

    return <BaseCard {...props} />;
};

export default PressureCard;
