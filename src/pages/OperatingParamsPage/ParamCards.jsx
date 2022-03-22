import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    ButtonDropdown,
    Card,
    CardBody, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText
} from "reactstrap";
import * as STORE from "../../store";
import * as UNITS from '../../units';
import CpIcon from "./icons/cp.png";
import HeatIcon from "./icons/heat.png";
import PressureIcon from "./icons/pressure.png";
import TemperatureIcon from "./icons/temperature.png";

const ParamCard = ({ label, icon, unitList, name, valueAction, unitAction }) => {
    const value = useSelector((state) => state.operatingParams[name]);
    const unit = useSelector((state) => state.operatingParams[name + "Unit"]);
    const dispatch = useDispatch();

    const onValueChange = useCallback(
        (e) => {
            dispatch(valueAction(e.target.value));
        },
        [dispatch, valueAction]
    );

    useEffect(() => {
        if(!unit) {
            dispatch(unitAction(unitList[0]));
        }
    }, [dispatch, unit, unitAction, unitList]);

    return (
        <Card className={!value ? "border-danger" : "bg-light"}>
            <CardBody className="d-flex flex-column">
                <img src={icon} width={64} alt={label} className="mx-auto" />
                <span className="fw-bolder text-center">{label}</span>

                <InputGroup>
                    <Input
                        value={value}
                        invalid={!value}
                        onChange={onValueChange}
                        placeholder={`Enter ${label}`}
                    />
                    <InputGroupText className="bg-dark text-white">{unit}</InputGroupText>
                </InputGroup>
            </CardBody>
        </Card>
    );
};

export const TemperatureCard = () => {
    const props = {
        label: "Temperature",
        icon: TemperatureIcon,
        name: "temperature",
        valueAction: STORE.SET_TEMPERATURE,
        unitAction: STORE.SET_TEMPERATURE_UNIT,
        unitList: UNITS.TEMPERATURE_UNITS_LIST,
    };

    return <ParamCard {...props} />;
};

export const PressureCard = () => {
    const props = {
        label: "Pressure",
        icon: PressureIcon,
        name: "pressure",
        valueAction: STORE.SET_PRESSURE,
        unitAction: STORE.SET_PRESSURE_UNIT,
        unitList: UNITS.PRESSURE_UNITS_LIST,
    };

    return <ParamCard {...props} />;
};

export const CpCard = () => {
    const props = {
        label: "Cp (mix)",
        icon: CpIcon,
        name: "cp",
        valueAction: STORE.SET_CP,
        unitAction: STORE.SET_CP_UNIT,
        unitList: UNITS.CP_UNITS_LIST,
    };

    return <ParamCard {...props} />;
};

export const HeatCard = () => {
    const props = {
        label: "Heat of Reaction",
        icon: HeatIcon,
        name: "heatOfReaction",
        valueAction: STORE.SET_HEAT_OF_REACTION,
        unitAction: STORE.SET_HEAT_OF_REACTION_UNIT,
        unitList: UNITS.HEAT_UNITS_LIST,
    };

    return <ParamCard {...props} />;
};
