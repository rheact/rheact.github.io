import BaseCard from "./BaseCard";
import { SET_TEMPERATURE, SET_TEMPERATURE_UNIT } from 'store';
import { TEMPERATURE_UNITS_LIST } from 'units';
import TemperatureIcon from "./icons/temperature.png";

const TemperatureCard = () => {
    const props = {
        labelText: "Temperature",
        labelNode: "Temperature",
        icon: TemperatureIcon,
        name: "temperature",
        valueAction: SET_TEMPERATURE,
        unitAction: SET_TEMPERATURE_UNIT,
        unitList: TEMPERATURE_UNITS_LIST,
    };

    return <BaseCard {...props} />;
};

export default TemperatureCard;

