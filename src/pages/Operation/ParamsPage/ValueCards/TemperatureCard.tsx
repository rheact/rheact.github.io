import * as STORE from "../../../../store";
import * as UNITS from '../../../../units';
import BaseCard from "./BaseCard";
import TemperatureIcon from "./icons/temperature.png";

const TemperatureCard = () => {
    const props = {
        label: "Temperature",
        icon: TemperatureIcon,
        name: "temperature",
        valueAction: STORE.SET_TEMPERATURE,
        unitAction: STORE.SET_TEMPERATURE_UNIT,
        unitList: UNITS.TEMPERATURE_UNITS_LIST,
    };

    return <BaseCard {...props} />;
};

export default TemperatureCard;

